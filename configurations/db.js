const {Client}=require("pg");
console.log(process.env.User);
const client = new client({
   url: process.env.User
});
module.exports=client;