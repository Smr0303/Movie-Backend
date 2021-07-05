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
        res.status(500).json({
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
client.query(`SELECT * FROM users where email='${email}';`)
.then((data)=>{
  const exists=data.rows;
  if(exists===0){
    res.status(300).json(
      {
        message:"User does not exists please signUp",
      }
    );
}
else{
  bcrypt.compare(password,exists[0].password,(err,result)=>{
if(err){
  res.status(500).json({
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