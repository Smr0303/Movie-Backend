const express=require('express');
const routes=express.Router();
const{signUp,signIn,changePassword}=require('../controllers/auth');
const{checkToken}=require('../middleware/authmiddleware');

routes.post('/signUp',signUp);
routes.post('/signIn',signIn);
routes.post('/changePassword',checkToken,changePassword);
module.exports=routes;

