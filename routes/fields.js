const express= require("express");
const fields=express.Router();
const {deleteFields,addFields,updateFields} =require("../controllers/fields")


fields.post("/:id/fields/pop",deleteFields);
fields.post("/:id/fields/push",addFields);
fields.patch("/:id/fields/patch",updateFields);


module.exports= fields