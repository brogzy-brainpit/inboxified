const express= require("express");
const template=express.Router();
const {deleteTemplate,addTemplate,updateTemplate} =require("../controllers/templates")


template.post("/:id/template/pop",deleteTemplate);
template.post("/:id/template/push",addTemplate);
template.patch("/:id/template/patch",updateTemplate);


module.exports= template