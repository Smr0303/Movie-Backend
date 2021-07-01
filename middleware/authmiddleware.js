const jwt =require('jsonwebtoken');
const client=require('../configurations/db');

exports.checkToken=(req,res,next)=>{
    const token=req.headers.authorization;
    jwt.verify(token,SECRET_KEY,(err,decoded)=>{
        if(err){
            res.status(500).json({
                error:"Internal server error"
            });
        }

            else{
                const email=decoded.email;
                client
                .query(`SELECT * FROM users where email=${email};`)
                .then((data)=>{
                    if(data.rows.length===0){
                        res.status(400).json({
                            error:"Token is not valid"
                        });
                        
                    }
                        else{
                            req.email=email;
                            next();
                    }
                }).catch((err)=>{
                    res.status(500).json({
                        error:"Error from database"
                    })
                });
            }
        
    });
}
