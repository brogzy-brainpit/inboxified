const express= require("express");
const mailRoute=express.Router();
const {mail,schedule,previewMail} =require("../controllers/sendmail")

// send mail to queue

mailRoute.post("/preview",previewMail);
mailRoute.post("/",mail);
mailRoute.post("/schedule",schedule);

module.exports= mailRoute  
             