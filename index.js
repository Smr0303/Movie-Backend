require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
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

app.listen(port, () => {
  console.log("Server is Running");
});
