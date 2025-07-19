const express= require("express");
const blogs=express.Router();
const {addBlog,deleteBlog,updateBlog,getBlog,getMeta,getAllBlog} =require("../controllers/bloging")


blogs.get("/:id/blogs/get/",getAllBlog);
blogs.get("/:id/blogs/get/:blogId",getBlog);
blogs.get("/:id/get/templates",getMeta);
blogs.post("/:id/blogs/pop",deleteBlog);
blogs.post("/:id/blogs/push",addBlog);
blogs.post("/:id/blogs/patch",updateBlog);


module.exports= blogs;