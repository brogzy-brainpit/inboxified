const express= require("express");
const warmup=express.Router();
const {addWarmupInbox,deleteWarmupInbox,getWarmupInbox,updateWarmupInbox} =require("../controllers/warmup");


warmup.get("/:id/warmup/get",getWarmupInbox);
// warmup.get("/:id/subscribers/get",getSubscriber);
warmup.patch("/:id/warmup/pop",deleteWarmupInbox);
warmup.patch("/:id/warmup/push",addWarmupInbox);
warmup.patch("/:id/warmup/patch",updateWarmupInbox);

  
module.exports= warmup; 