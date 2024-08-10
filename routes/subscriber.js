const express= require("express");
const subscriber=express.Router();
const {deleteSubscriber,addSubscriber,updateSubscriber,getSubscriber} =require("../controllers/subscribers")


subscriber.get("/:id/subscribers/get",getSubscriber);
subscriber.patch("/:id/subscribers/pop",deleteSubscriber);
subscriber.patch("/:id/subscribers/push",addSubscriber);
subscriber.patch("/:id/subscribers/patch",updateSubscriber);

  
module.exports= subscriber; 