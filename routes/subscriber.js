const express= require("express");
const subscriber=express.Router();
const {deleteSubscriber,addSubscriber,updateSubscriber,getSubscriber,addSubscribers} =require("../controllers/subscribers");
const { getSegmentSubscriber } = require("../controllers/segmentSubscribers");


subscriber.post("/:id/subscribers/get",getSegmentSubscriber);
// subscriber.get("/:id/subscribers/get",getSubscriber);
subscriber.patch("/:id/subscribers/pop",deleteSubscriber);
subscriber.patch("/:id/subscribers/push",addSubscriber);
subscriber.patch("/:id/subscribers/pushmany",addSubscribers);
subscriber.patch("/:id/subscribers/patch",updateSubscriber);

  
module.exports= subscriber; 