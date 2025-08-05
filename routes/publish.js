const express= require("express");
const template=express.Router();
const {fetchPublished,publishTemplate,fetchSinglePublished,deletePublishedTemplate} =require("../controllers/publishing")

template.delete("/delete/:templateName", deletePublishedTemplate);
template.get("/get",fetchPublished);
template.get("/get/:template",fetchSinglePublished);
template.post("/create",publishTemplate);
// template.patch("/:id/template/pop",deleteTemplate);


module.exports= template 