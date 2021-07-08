const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../configurations/db");
exports.signUp = (req, res) => {
  const { name, email, password, contact } = req.body;
  client
    .query(`SELECT * FROM users where email='${email}';`)
    .then((data) => {
      const exists = data.rows;
      if (exists.length !== 0) {
        res.status(400).json({
          error: "User alerady exists",
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              message: "Internal server error",
            });
          }
          const user = {
            name,
            email,
            password: hash,
            contact,
          };
          const token = jwt.sign(
            {
              email: email,
            },
            process.env.SECRET_KEY,
            {
              expiresIn:'12h'
            }
          );
          client
            .query(
              `INSERT INTO users (name , email, password ,contact) VALUES('${user.name}','${user.email}','${user.password}','${user.contact}' );`
            )
            .then((data) => {
              res.status(200).json({
                message: "User added succesfully!!!!",
                token: token,
              });
            })
            .catch((err) => {
              console.log("hi");
              res.status(500).json({
                error: "Servor error try after sometime",
              });
            });
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
        error: "Servor error try after sometime",
      });
    });
};

exports.signIn=(req,res)=>{
  const {email, password}=req.body;
client.query(`SELECT * FROM users where email='${email}'`)
.then((data)=>{
  const exists=data.rows;
  if(exists.length===0){
    res.status(400).json(
      {
        error:"User does not exist",
      }
    );
}
else{
  bcrypt.compare(password,exists[0].password,(err,result)=>{
if(err){
  res.status(400).json({
    error:"Server down try later!",
  });
}
else if(result===true){
  const token=jwt.sign(
  {
    email:email,
  },
  process.env.SECRET_KEY,
  {
    expiresIn:'12h'
  }
  );
res.status(200).json({
  message:"Signed In Successfully",
  token:token
});
}
else{
  res.status(400).json({
    error:"Incorrect password",
  });
}
  })
}

})
.catch((err)=>{
res.status(500).json({
  error:"Internal server error",
})
});
}

exports.changePassword=(req,res)=>{
const{oldPass,newPass,email}=req.body;
client.query(`SELECT password FROM users where email='${email}'`)
.then((database_res)=>{
  const Pass=database_res.rows[0].password;
  // console.log(Pass)
  if(oldPass===newPass){
    res.status(400).json({
      message:"Please Enter A different Password"
    })
  }
  else{
    bcrypt.compare(oldPass,Pass,(err,result)=>{
      if(err){
        res.status(400).json({
          message:"Server down try later!",
        });
      }
      else if(result===true){
        bcrypt.hash(newPass, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              message: "Internal server error",
            });
          }
          else{
            client.query(`UPDATE users SET password = '${hash}' WHERE email = '${email}'`).then(() => {
              res.status(200).json({
                message:"Password Changed Successfully!"
              });
            }).catch((error) => {
              res.status(500).json({
                message:"Database Error :)"
              });
            })
          }
        })

      }
      else{
        res.status(400).json({
          message:"Incorrect Old password"
        });
      }
        })
  }
  }).catch((error) => {
    res.status(500).json({
      message:"Database Error :)"
    });
  })
}


// exports.changePassword=(req,res)=>{
// const{oldPass,newPass,email}=req.body;
// client.query(`SELECT password FROM users where email=${email};`)
// .then((res)=>{
//   const Pass=res.password;
//   if(oldPass===Pass){
//     res.status(400).json({
//       message:"Same as new Password"
//     })
//   }
//   else{
//     client.query(`UPDATE users SET password=${newPass} where email=${email};`)
//     .then((database_res)=>{
// res.status(200).json({
//   message:"Password changed successfully!!"
// });
//     }).catch((err)=>{
//       res.status(500).json({
//         error:"Internal Server error"
//       })
//     })
//   }

// })
// }