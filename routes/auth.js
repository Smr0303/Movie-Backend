const express=require('express');
const routes=express.Router();
const{signUp,signIn}=require('../controllers/auth');

routes.post('/signUp',signUp);
routes.post('/signIn',signIn);
module.exports=routes;

