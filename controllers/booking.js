const client = require("../configurations/db");
const Razorpay = require('razorpay');
exports.block = (req, res) => {
  let title = "";
  let poster_path = "";

// -------------------------------- poster and title -------------------------------------------------
if(req.body.movie_id == 337404)
 {
 title = 'Cruella'
 poster_path = '/rTh4K5uw9HypmpGslcKd4QfHl93.jpg'
 }
else if(req.body.movie_id == 423108)
 {
 title = 'The Conjuring: The Devil Made Me Do It'
 poster_path = '/xbSuFiJbbBWCkyCCKIMfuDCA4yV.jpg'
 }
else if(req.body.movie_id == 637649)
 {
 title = 'Wrath of Man'
 poster_path = '/M7SUK85sKjaStg4TKhlAVyGlz3.jpg'
 }
else if(req.body.movie_id == 717192)
 {
 title = 'Ferry'
 poster_path = '/srYGZ1rd9rvzwAltcKREUdS1JSQ.jpg'
 }
else if(req.body.movie_id == 460465)
 {
 title = 'Mortal Kombat'
 poster_path = '/nkayOAUBUu4mMvyNf9iHSUiPjF1.jpg'
 }
else if(req.body.movie_id == 503736)
 {
 title = 'Army of the Dead'
 poster_path = '/z8CExJekGrEThbpMXAmCFvvgoJR.jpg'
 }
else if(req.body.movie_id == 632357)
 {
 title = 'The Unholy'
 poster_path = '/bShgiEQoPnWdw4LBrYT5u18JF34.jpg'
 }
else if(req.body.movie_id == 817451)
 {
 title = 'Endangered Species'
 poster_path = '/ccsSqbpEqr2KK9eMvoeF8ERFCd5.jpg'
 }
else if(req.body.movie_id == 399566)
 {
 title = 'Godzilla vs. Kong'
 poster_path = '/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg'
 }
else if(req.body.movie_id == 520763)
 {
 title = 'A Quiet Place Part II'
 poster_path = '/4q2hz2m8hubgvijz8Ez0T2Os2Yv.jpg'
 }
else if(req.body.movie_id == 567189)
 {
 title = `Tom Clancy's Without Remorse`
 poster_path = '/rEm96ib0sPiZBADNKBHKBv5bve9.jpg'
 }
else if(req.body.movie_id == 602734)
 {
 title = 'Spiral: From the Book of Saw'
 poster_path = '/lcyKve7nXRFgRyms9M1bndNkKOx.jpg'
 }
else if(req.body.movie_id == 804435)
 {
 title = 'Vanquish'
 poster_path = '/AoWY1gkcNzabh229Icboa1Ff0BM.jpg'
 }
else if(req.body.movie_id == 578701)
 {
 title = 'Those Who Wish Me Dead'
 poster_path = '/xCEg6KowNISWvMh8GvPSxtdf9TO.jpg'
 }
else if(req.body.movie_id == 808023)
 {
 title = 'The Virtuoso'
 poster_path = '/vXHzO26mJaOt4VO7ZFiM6No5ScT.jpg'
 }
else if(req.body.movie_id == 726429)
 {
 title = 'Xtreme'
 poster_path = '/cwUhVcDeMYYeu8fq5q1OPOoSbZ7.jpg'
 }
else if(req.body.movie_id == 823855)
 {
 title = 'I Am All Girls'
 poster_path = '/m6bUeV4mczG3z2YXXr5XDKPsQzv.jpg'
 }
else if(req.body.movie_id == 615457)
 {
 title = 'Nobody'
 poster_path = '/oBgWY00bEFeZ9N25wWVyuQddbAo.jpg'
 }
else if(req.body.movie_id == 791373)
 {
 title = `Zack Snyder's Justice League`
 poster_path = '/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg'
 }
else if(req.body.movie_id == 615678)
 {
 title = 'Thunder Force'
 poster_path = '/3mKMWP5OokB7QpcOMA1yl8BXFAF.jpg'
 }
// --------------------------------poster and title end ----------------------------------------------



  let total = 0;
  let hall = "";
  let slot_flag = 1;
  let booking_date = new Date();
  let current_min = booking_date.getHours()*60 + booking_date.getMinutes();
  let dd = booking_date.getDate();
  let mm = booking_date.getMonth()+1;
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

// -------------------------------------------------------------------------------------------------------
if(req.body.date<booking_date)
{
    slot_flag = 0;
    res.status(400).json({
    message:"Bad request try again"
});
}
else if(req.body.date==booking_date)
{
if(req.body.slot =='slot1' && current_min+20>540)
{
    slot_flag = 0;
    res.status(400).json({
    message:"Bad request try again"
});
}
else if(req.body.slot =='slot2' && current_min+20>690)
{
    slot_flag = 0;
    res.status(400).json({
    message:"Bad request try again"
});
}
else if(req.body.slot =='slot3' && current_min+20>840)
{
    slot_flag = 0;
    res.status(400).json({
    message:"Bad request try again"
});
}
else if(req.body.slot =='slot4' && current_min+20>990)
{
    slot_flag = 0;
    res.status(400).json({
    message:"Bad request try again"
});
}
else if(req.body.slot =='slot5' && current_min+20>1140)
{
    slot_flag = 0;
    res.status(400).json({
    message:"Bad request try again"
});
}
else if(req.body.slot =='slot6' && current_min+20>1290)
{
    slot_flag = 0;
    res.status(400).json({
    message:"Bad request try again"
});
}
else if(req.body.slot =='slot7' && current_min+20>1430)
{
    slot_flag = 0;
    res.status(400).json({
    message:"Bad request try again"
});
}
}
// -------------------------------------------------------------------------------------------------------
if(slot_flag == 1)
{
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
          if(database_res.rows[i].booked==1||database_res.rows[i].blocked==1){
            flag=0;
          }  
      }
  }).then(()=>{
      if(flag===1){
          client.query(`UPDATE movies SET blocked = 1, email = '${req.body.email}' WHERE date = '${req.body.date}' AND slot = '${req.body.slot}' AND movie_id = ${req.body.movie_id} AND (${seats_query})`)
          .then((database_res)=>{
            setTimeout(() => {
                client.query(`UPDATE movies SET blocked = 0, email = '' WHERE date = '${req.body.date}' AND slot = '${req.body.slot}' AND movie_id = ${req.body.movie_id} AND (${seats_query})`)
              }, 300000);

              var instance = new Razorpay({ key_id: `${process.env.razorpay_api_key}`, key_secret: `${process.env.razorpay_secret_key}` })

    var options = {
      amount: total,  // amount in the smallest currency unit
      currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
  
      client.query(`INSERT INTO bookings (order_id,movie_id,date,slot,seat_text,hall,total,max_time,booking_date,email,title,poster_path) values ('${order.id}',${req.body.movie_id},'${req.body.date}','${req.body.slot}','${final_seats}','${hall}',${total},'${max_time}','${booking_date}','${req.body.email}','${title}','${poster_path}')`)
      .then(() => {
          res.status(200).json({
              order_id:order.id,
          })
        // obj = {
        //   order_id : order.id
        // }
        // res.send(obj);
          })
        })
      }).catch((err)=>{
        // console.log(err)
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
    // console.log(err)
      res.status(500).json({
          error:"Database error"
      })
  })
}
};
  exports.showPay=(req,res)=>{
    client.query(`SELECT * FROM bookings where order_id = '${req.body.order_id}'`)
    .then((database_res) => {
      if(database_res.rows[0].email == req.body.email)
      res.status(200).send(database_res.rows);
      else
      {
      res.status(400).json({
        error:"Database error try again",
    })
  }
      }).catch((err)=>{
          res.status(500).json({
              error:"Database error try again",
          })
      })
  }

  exports.checkPay=(req,res)=>{
    //  console.log("hii")
    var request = require('request');
    // console.log(req.body)
    request(`https://${process.env.razorpay_api_key}:${process.env.razorpay_secret_key}@api.razorpay.com/v1/payments/${req.body.payment_id}`, function (error, response, body) {
      // console.log('Response:', JSON.parse(body));
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
            res.status(200).json({
                message:"Payment Successful",
            });
          }).catch((err)=>{
            // console.log(err)
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
