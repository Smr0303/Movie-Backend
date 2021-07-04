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

