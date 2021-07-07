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