require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const authroutes=require('./routes/auth');
const cors=require('cors');
const client=require("./configurations/db");

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
  res.send("hi");
});

client.connect(()=>{
  console.log("connected to DAtabase");
});
app.use('/auth',authroutes);

// -------------------------------Separate the cocern for these routes------------------------------------
app.post("/show_slots",(req,res) => {

  client.query(`SELECT * FROM slots where date = '${req.body.date}' AND movie_id = ${req.body.movie_id} order by slot_time asc`).then((database_res) => {
    res.send(database_res.rows);
  })
})
app.post("/show_available",(req,res) => {

  client.query(`SELECT * FROM available where movie_id = ${req.body.movie_id} order by date asc`).then((database_res) => {
    res.send(database_res.rows);
  })
})
app.post("/show_seats",(req,res) => {

  client.query(`SELECT * FROM movies where movie_id = ${req.body.movie_id} AND date = '${req.body.date}' AND slot = '${req.body.slot}' order by position asc`).then((database_res) => {
    res.send(database_res.rows);
  })
})
// --------------------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
