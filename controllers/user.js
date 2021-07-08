const client = require("../configurations/db");

exports.showBookings=(req,res)=>{
    client.query(`SELECT * FROM bookings where email = '${req.body.email}' order by date desc`)
    .then((database_res) => {
        res.status(200).send(database_res.rows);
      }).catch((err)=>{
          res.status(500).json({
              error:"Database error try again",
          })
      })
  }

exports.showUser=(req,res)=>{
    client.query(`SELECT name,email,contact FROM users where email = '${req.body.email}'`)
    .then((database_res) => {
        //  console.log(database_res)
        res.status(200).send(database_res.rows);
      }).catch((err)=>{
          res.status(500).json({
              error:"Database error try again",
          })
      })
  }

  
  exports.contactUs = (req, res) => {
    const {reason,Name,organisation,region,number,email}=req.body;
  client
    .query(`INSERT INTO contactus (reason,name,organisation,region,number,email) values ('${reason}','${Name}','${organisation}','${region}',${number},'${email}')`)
    .then((data) => {
      res.status(200).json({
        message: "We will contact you soon",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error from server side try again" });
    });
};