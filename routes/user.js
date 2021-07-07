const express=require('express');
const routes=express.Router();
const{checkToken}=require('../middleware/authmiddleware');

const{showBookings}=require('../controllers/user');
routes.post("/show_bookings",checkToken,showBookings);


module.exports=routes;