const express=require('express');
const routes=express.Router();
const {checkToken}=require("../middleware/authmiddleware");

const{block,showPay,checkPay}=require('../controllers/booking');

routes.post('/block',block);
routes.post('/show_pay',showPay);
routes.post('check_pay',checkPay);

module.exports=routes;