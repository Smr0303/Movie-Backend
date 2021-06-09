require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors=require('cors');

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log("Server is Running");
});
