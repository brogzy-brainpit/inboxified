const express= require("express");
const segment=express.Router();
const {deleteSegment,addSegment,updateSegment,getSegment} =require("../controllers/segments")


segment.get("/:id/segment/get/:segmentId",getSegment);
segment.post("/:id/segment/pop",deleteSegment);
segment.post("/:id/segment/push",addSegment);
segment.post("/:id/segment/patch",updateSegment);


module.exports= segment