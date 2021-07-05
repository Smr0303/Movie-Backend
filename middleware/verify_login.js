const jwt = require('jsonwebtoken');
const client = require('../configurations/db');

exports.checkLogin = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(400).json({
                error:"Bad Request"
            });
        }

        else {
            res.status(200).json({
                message: "User Logged In"
            });
        }
    // }
    })
}