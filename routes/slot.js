const express=require('express');
const routes=express.Router();
const{checkToken}=require('../middleware/authmiddleware');

const{showslots,showavailable,showseats}=require('../controllers/slot');
routes.post("/show_slots",checkToken,showslots);
routes.post("/show_available",checkToken,showavailable);
routes.post("/show_seats",checkToken,showseats);

module.exports=routes;
