const express= require("express");
const template=express.Router();
const {fetchPublished,publishTemplate,fetchSinglePublished} =require("../controllers/publishing")


template.get("/get",fetchPublished);
template.get("/get/:template",fetchSinglePublished);
template.post("/create",publishTemplate);
// template.patch("/:id/template/pop",deleteTemplate);


module.exports= template 