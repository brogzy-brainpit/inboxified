const express= require("express");
const mailRoute=express.Router();
const {campaign} =require("../controllers/sendCampaign")

// send mail to queue

mailRoute.post("/",campaign);

module.exports= mailRoute  
            