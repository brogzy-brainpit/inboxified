const express= require("express");
const route=express.Router();
const {createUser,login,updateUser,deleteUser,verifyUser} =require("../controllers/users")
const {dashboard,test} =require("../controllers/dashboard")

// register a new user
route.post("/register",createUser);
route.get("/verifyUser",verifyUser);
route.post("/deleteUser",deleteUser);
route.post("/updateUser",updateUser);
route.get("/dashboard",dashboard);
//login a  user
route.post("/login",login)
module.exports= route
