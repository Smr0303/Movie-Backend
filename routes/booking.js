const express=require('express');
const routes=express.Router();
const {checkToken}=require("../middleware/authmiddleware");

const{block,showPay,checkPay}=require('../controllers/booking');

routes.post('/block',checkToken,block);
routes.post('/show_pay',checkToken,showPay);
routes.post('/check_pay',checkPay);

module.exports=routes;