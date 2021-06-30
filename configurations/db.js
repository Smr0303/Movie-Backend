const {Client}=require("pg");
// console.log(process.env.User);
const client = new Client(
   process.env.User
);
module.exports=client;