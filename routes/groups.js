const express= require("express");
const groups=express.Router();
const {addGroups,deleteGroups,updateGroups} =require("../controllers/groups")


groups.post("/:id/groups/pop",deleteGroups);
groups.post("/:id/groups/push",addGroups);
groups.patch("/:id/groups/patch",updateGroups);


module.exports= groups