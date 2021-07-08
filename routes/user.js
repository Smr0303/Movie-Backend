const express=require('express');
const routes=express.Router();
const{checkToken}=require('../middleware/authmiddleware');

const{showBookings,showUser}=require('../controllers/user');
routes.post("/show_bookings",checkToken,showBookings);
routes.post("/show_user",checkToken,showUser);


module.exports=routes;