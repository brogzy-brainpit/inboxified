const express= require("express");
const mailRoute=express.Router();
const {mail,schedule} =require("../controllers/sendmail")

// send mail to queue

mailRoute.post("/",mail);
mailRoute.post("/schedule",schedule);

module.exports= mailRoute  
             