const client=require('../configurations/db');
exports.showslots=(req,res)=>{
    client.query(`SELECT * FROM slots where date = '${req.body.date}' AND movie_id = ${req.body.movie_id} order by slot_time asc`)
    .then((database_res) => {
        res.send(database_res.rows);
      }).catch((err)=>{
          res.status.json({
              error:"Database error"
          });
      })
}
exports.showavailable=(req,res)=>{
    client.query(`SELECT * FROM available where movie_id = ${req.body.movie_id} order by date asc`)
    .then((database_res) => {
        res.send(database_res.rows);
      }).catch((err)=>{
          res.status.json({
              error:"Database error"
          });
      });
}
exports.showseats=(req,res)=>{
    client.query(`SELECT * FROM movies where movie_id = ${req.body.movie_id} AND date = '${req.body.date}' AND slot = '${req.body.slot}' order by position asc`)
    .then((database_res) => {
        res.send(database_res.rows);
      }).catch((err)=>{
          res.status.json({
              error:"Database error"
          });
      });
}