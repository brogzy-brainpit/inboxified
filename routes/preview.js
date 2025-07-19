const express= require("express");
const preview=express.Router();
const {createPreview} =require("../controllers/fetchPreview")


preview.get("/:id",createPreview);




module.exports= preview