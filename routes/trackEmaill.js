const express= require("express");
const trackEmail=express.Router();
const {publishTrack,userTrackers,getSingleTracker, openRate, clickRate} =require("../controllers/track")


trackEmail.post("/create",publishTrack);
trackEmail.get("/user/:id",userTrackers);
trackEmail.get("/tracker/:id",getSingleTracker);
trackEmail.get("/open/:trackingId",openRate);
trackEmail.get("/click/:guid",clickRate);
// trackEmail.get("/stats/:guid",trackStats);
// trackEmail.delete("/deleteTrack/:guid",deleteTrack);
  
module.exports= trackEmail;