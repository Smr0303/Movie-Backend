const express=require('express');
const routes=express.Router();
const{checkToken}=require('../middleware/authmiddleware');

const{showslots,showavailable,showseats}=require('../controllers/slot');
routes.post("/show_slots",showslots);
routes.post("/show_available",showavailable);
routes.post("/show_seats",showseats);

module.exports=routes;
