const client = require("../configurations/db");

exports.block = (req, res) => {
  let total = 0;
  let hall = "";
  let booking_date = new Date();
  let dd = booking_date.getDate();
  let mm = booking_date.getMonth();
  let yyyy = booking_date.getFullYear();
  let max_time = booking_date.getTime();

  max_time += 300000;
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  booking_date = `${yyyy}-${mm}-${dd}`;

for (let i = 0; i < req.body.seats.length; i++) {
    let x = Number(req.body.seats[i].slice(req.body.seats[i].indexOf("t") + 1,req.body.seats[i].length)
    );
    if (x >= 1 && x <= 40) 
    total += 280;
    else if (x >= 41 && x <= 100)
     total += 180;
    else if (x >= 101 && x <= 140) 
    total += 120;
  }
  total *= 100;
};

let flag=1;
let seats_query="";
let final_seats="";

for (let i=0;i<req.body.seats.length;i++){
    if (i != req.body.seats.length - 1)
    seats_query += `seat_id = '${req.body.seats[i]}' OR `
  else
    seats_query += `seat_id = '${req.body.seats[i]}'`
}
for (let i = 0; i < req.body.seats.length; i++) {
    if (i != req.body.seats.length - 1)
      final_seats += `${req.body.seats[i]},`
    else
      final_seats += `${req.body.seats[i]}`
  }

  client
  .query(`SELECT * FROM movies WHERE date = '${req.body.date}' AND slot = '${req.body.slot}' AND movie_id = ${req.body.movie_id} AND (${seats_query})`)
  .then((database_res)=>{
      hall=database_res.rows[0].hall;
      for (let i=0;i<database_res.rows.length;i++){
          if(database_res.rows.seats[i].booked==1||database_res.rows.seats[i].blocked==1){
            flag=0;
          }
      }
  }).then(()=>{
      if(flag===1){
          client.query(`UPDATE movies SET blocked = 1, email = 'abc@gmail.com' WHERE date = '${req.body.date}' AND slot = '${req.body.slot}' AND movie_id = ${req.body.movie_id} AND (${seats_query})`)
          .then((database_res)=>{
            setTimeout(() => {
                client.query(`UPDATE movies SET blocked = 0 WHERE date = '${req.body.date}' AND slot = '${req.body.slot}' AND movie_id = ${req.body.movie_id} AND (${seats_query})`)
              }, 20000);

              var instance = new Razorpay({ key_id: `${process.env.razorpay_api_key}`, key_secret: `${process.env.razorpay_secret_key}` })

    var options = {
      amount: total,  // amount in the smallest currency unit
      currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
  
      client.query(`INSERT INTO bookings (order_id,movie_id,date,slot,seat_text,hall,total,max_time,booking_date,email) values ('${order.id}',${req.body.movie_id},'${req.body.date}','${req.body.slot}','${final_seats}','${hall}',${total},'${max_time}','${booking_date}','abc@gmail.com')`)
      .then(() => {
          res.status(200).json({
              order_id:order_id,
          })
        // obj = {
        //   order_id : order.id
        // }
        // res.send(obj);
          })
        })
      }).catch((err)=>{
          res.status(500).json({
              error:"Server error Try again!"
          })
      })
    }
    else{
        res.status(400).json({
            message:"Bad request try again"
        });
    }
  })
  .catch((err)=>{
      res.status(500).json({
          error:"Database error"
      })
  })

  exports.showPay=(req,res)=>{
    client.query(`SELECT * FROM bookings where order_id = '${req.body.order_id}'`)
    .then((database_res) => {
      res.status(200).send(database_res.rows);
      }).catch((err)=>{
          res.status.json({
              error:"Database error try again",
          })
      })
  }

  exports.checkPay=(req,res)=>{

    var request = require('request');
    // console.log(req.body)
    request(`https://${process.env.razorpay_api_key}:${process.env.razorpay_secret_key}@api.razorpay.com/v1/payments/${req.body.payment_id}`, function (error, response, body) {
      // console.log('Response:', JSON.parse(body).captured);
      // res.sendStatus(200);
      client.query(`SELECT * FROM bookings where order_id = '${req.body.order_id}'`).then((data) => {
        // console.log(data.rows);
      if(JSON.parse(body).captured == true && JSON.parse(body).order_id == req.body.order_id && data.rows[0].status == null)
      {
        client.query(`UPDATE bookings SET payment_id = '${req.body.payment_id}', status = 1 WHERE order_id = '${req.body.order_id}'`)
        .then((database_res) => {
          let seat_array = data.rows[0].seat_text.split(',');
          let seat_string = "";
          for (var i = 0; i < seat_array.length; i++) {
            if (i != seat_array.length - 1)
            seat_string += `seat_id = '${seat_array[i]}' OR `
            else
            seat_string += `seat_id = '${seat_array[i]}'`
          }
          // console.log(seat_string);
          client.query(`UPDATE movies SET booked = 1, email = 'abc@gmail.com' WHERE date = '${data.rows[0].date}' AND slot = '${data.rows[0].slot}' AND movie_id = ${data.rows[0].movie_id} AND (${seat_string})`)
          .then((database_res) => {
            res.Status(200).json({
                message:"Payment Successful",
            });
          }).catch((err)=>{
              res.status(500).json({
                  error:"Database problem",
              })
          })
  
        }).catch((err)=>{
            res.status.json({
                error:"Database problem",
            })
        })
      }
      else if(JSON.parse(body).captured == false && JSON.parse(body).order_id == req.body.order_id && data.rows[0].status == null)
      {
        client.query(`UPDATE bookings SET payment_id = '${req.body.payment_id}', status = 0 WHERE order_id = '${req.body.order_id}'`)
        .then((database_res) => {
          res.status(200).json({
              message:"Successful",
          });
        })
      }
      else
      {
        res.status(400).json({
          message:"Bad request",
});
      }
    })
    });

  }
