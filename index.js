require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const authroutes = require("./routes/auth");
const slotroutes = require("./routes/slot");
const bookroutes = require("./routes/booking");
const cors = require("cors");
const client = require("./configurations/db");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hi");
});

client.connect(() => {
  console.log("connected to DAtabase");
});
app.use("/auth", authroutes);
app.use("/slots", slotroutes);
app.use("/booking", bookroutes);

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});

// //-------(03/07/2021)---------Separate the concern and handle the errors -------------------------------

// // +++++++++++++++++++++++++++++++++++++++++++++ route1 ------------------------------------------------
// app.post("/check_pay", (req, res) => {
//   var request = require('request');
//   // console.log(req.body)
//   request(`https://${process.env.razorpay_api_key}:${process.env.razorpay_secret_key}@api.razorpay.com/v1/payments/${req.body.payment_id}`, function (error, response, body) {
//     // console.log('Response:', JSON.parse(body).captured);
//     // res.sendStatus(200);
//     client.query(`SELECT * FROM bookings where order_id = '${req.body.order_id}'`).then((data) => {
//       // console.log(data.rows);
//     if(JSON.parse(body).captured == true && JSON.parse(body).order_id == req.body.order_id && data.rows[0].status == null)
//     {
//       client.query(`UPDATE bookings SET payment_id = '${req.body.payment_id}', status = 1 WHERE order_id = '${req.body.order_id}'`).then((database_res) => {
//         let seat_array = data.rows[0].seat_text.split(',');
//         let seat_string = "";
//         for (var i = 0; i < seat_array.length; i++) {
//           if (i != seat_array.length - 1)
//           seat_string += `seat_id = '${seat_array[i]}' OR `
//           else
//           seat_string += `seat_id = '${seat_array[i]}'`
//         }
//         // console.log(seat_string);
//         client.query(`UPDATE movies SET booked = 1, email = 'abc@gmail.com' WHERE date = '${data.rows[0].date}' AND slot = '${data.rows[0].slot}' AND movie_id = ${data.rows[0].movie_id} AND (${seat_string})`).then((database_res) => {
//           res.sendStatus(200);
//         })

//       })
//     }
//     else if(JSON.parse(body).captured == false && JSON.parse(body).order_id == req.body.order_id && data.rows[0].status == null)
//     {
//       client.query(`UPDATE bookings SET payment_id = '${req.body.payment_id}', status = 0 WHERE order_id = '${req.body.order_id}'`).then((database_res) => {
//         res.sendStatus(200);
//       })
//     }
//     else
//     {
//       res.sendStatus(400);
//     }
//   })
//   });
// })
// // ++++++++++++++++++++++++++++++++++++++++++ route1 end ++++++++++++++++++++++++++++++++++++++++++++++++++

// // +++++++++++++++++++++++++++++++++++++++++ route2 ++++++++++++++++++++++++++++++++++++++++++++++++++++++
// app.post("/block", (req, res) => {
//   // console.log(req.body)
//   let total = 0;
//   let hall = "";
//   let booking_date = new Date;
//   let dd = booking_date.getDate();
//   let mm = booking_date.getMonth()+1;
//   let yyyy = booking_date.getFullYear();
//   let max_time = booking_date.getTime();
//   max_time+=300000;
//   if(dd<10)
// {
//     dd = `0${dd}`
// }
// if(mm<10)
// {
//     mm = `0${mm}`
// }
// booking_date = `${yyyy}-${mm}-${dd}`;

// for(var i=0;i<req.body.seats.length;i++)
// {
//     let x = Number(req.body.seats[i].slice(req.body.seats[i].indexOf('t')+1,req.body.seats[i].length));
//     if(x>=1 && x<=40)
//     total+=280;
//     else if(x>=41 && x<=100)
//     total+=180;
//     else if(x>=101 && x<=140)
//     total+=120;
// }
// total*=100;

//   let flag = 1;
//   let seat_string = "";
//   let final_seats = "";
//   for (var i = 0; i < req.body.seats.length; i++) {
//     if (i != req.body.seats.length - 1)
//       seat_string += `seat_id = '${req.body.seats[i]}' OR `
//     else
//       seat_string += `seat_id = '${req.body.seats[i]}'`
//   }
//   for (var i = 0; i < req.body.seats.length; i++) {
//     if (i != req.body.seats.length - 1)
//       final_seats += `${req.body.seats[i]},`
//     else
//       final_seats += `${req.body.seats[i]}`
//   }
//   // seat_string = `seat_id = 'seat1'`;
//   // console.log(final_seats)
//   client.query(`SELECT * FROM movies WHERE date = '${req.body.date}' AND slot = '${req.body.slot}' AND movie_id = ${req.body.movie_id} AND (${seat_string})`).then((database_res) => {
//     hall = database_res.rows[0].hall;
//     for(var i = 0;i<database_res.rows.length;i++)
//     {
//       // console.log(database_res.rows[i]);
//       if(database_res.rows[i].booked == 1 || database_res.rows[i].blocked == 1)
//       flag = 0;
//     }
//   }).then(() => {

//  if(flag == 1)
//  {
//   client.query(`UPDATE movies SET blocked = 1, email = 'abc@gmail.com' WHERE date = '${req.body.date}' AND slot = '${req.body.slot}' AND movie_id = ${req.body.movie_id} AND (${seat_string})`).then((database_res) => {
//     // console.log(database_res.rows);
//     // console.log(req.body.date)
//     setTimeout(() => {
//       client.query(`UPDATE movies SET blocked = 0 WHERE date = '${req.body.date}' AND slot = '${req.body.slot}' AND movie_id = ${req.body.movie_id} AND (${seat_string})`)
//     }, 20000);
//     // res.send(database_res);
//     // console.log(1)
//     var instance = new Razorpay({ key_id: `${process.env.razorpay_api_key}`, key_secret: `${process.env.razorpay_secret_key}` })

//     var options = {
//       amount: total,  // amount in the smallest currency unit
//       currency: "INR",
//     };
//     instance.orders.create(options, function (err, order) {
//       // console.log(order);
//       client.query(`INSERT INTO bookings (order_id,movie_id,date,slot,seat_text,hall,total,max_time,booking_date,email) values ('${order.id}',${req.body.movie_id},'${req.body.date}','${req.body.slot}','${final_seats}','${hall}',${total},'${max_time}','${booking_date}','abc@gmail.com')`).then(() => {
//         obj = {
//           order_id : order.id
//         }
//         res.send(obj);
//       });
//     });
//   })
//  }
//  else
//  {
//    res.sendStatus(400);
//  }
// })
// })
// // +++++++++++++++++++++++++++++++++++++++++ route2 end ++++++++++++++++++++++++++++++++++++++++++++++++++

// // +++++++++++++++++++++++++++++++++++++++++ route 3 +++++++++++++++++++++++++++++++++++++++++++++++++++++
// app.post("/show_pay", (req, res) => {

//   client.query(`SELECT * FROM bookings where order_id = '${req.body.order_id}'`).then((database_res) => {
//     // console.log(database_res.rows);
//     res.send(database_res.rows);
//     // console.log(req.body.date)
//   })
// })
// // +++++++++++++++++++++++++++++++++++++++++ route 3 end +++++++++++++++++++++++++++++++++++++++++++++++++

// // --------(03/07/2021)------------------- all new routes end here----------------------------------------

// // -------------------------------Separate the cocern for these routes------------------------------------
// app.post("/show_slots",(req,res) => {

//   client.query(`SELECT * FROM slots where date = '${req.body.date}' AND movie_id = ${req.body.movie_id} order by slot_time asc`).then((database_res) => {
//     res.send(database_res.rows);
//   })
// })
// app.post("/show_available",(req,res) => {

//   client.query(`SELECT * FROM available where movie_id = ${req.body.movie_id} order by date asc`).then((database_res) => {
//     res.send(database_res.rows);
//   })
// })
// app.post("/show_seats",(req,res) => {

//   client.query(`SELECT * FROM movies where movie_id = ${req.body.movie_id} AND date = '${req.body.date}' AND slot = '${req.body.slot}' order by position asc`).then((database_res) => {
//     res.send(database_res.rows);
//   })
// })
// // --------------------------------------------------------------------------------------------------------
