require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const authroutes = require("./routes/auth");
const slotroutes = require("./routes/slot");
const bookroutes = require("./routes/booking");
const userroutes = require("./routes/user");
const cors = require("cors");
const client = require("./configurations/db");
const path = require("path");

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
app.use("/user",userroutes);

// -------------------------------------------------------------------------------------------------------
const { checkLogin } = require(`${path.join(__dirname, 'middleware/verify_login.js')}`);
app.get("/verify_login",checkLogin,(req,res) => {

}) 
// -------------------------------------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});

