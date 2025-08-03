const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt");
const Published= require("../model/templateAuth");
require("dotenv").config();

const fetchPublished= async(req,res)=>{
   try {

    const user= await Published.find({})
    // console.log(user);

    res.status(200).json(user)
   } catch (error) {
    res.status(403).send("something went wrong fetching templates")
   }
} 
const fetchSinglePublished= async(req,res)=>{
  const {email,publisherId}= req.body;
  const {template}= req.params;
  // console.log(req.params); 
  try {
    if(template){
      const user= await Published.findOne({templateName:template})
      if(!user){
       return res.status(404).send("no published template for this user!");
   
      }

      res.status(200).json({ userPublished: [user] });
    }else{
      res.status(403).json({msg:"no template name provided!!!"})
    }

  } catch (error) {
   res.status(500).send("network error, try checking your network connection")
  }
}
const publishTemplate= async(req,res)=>{
//  res.status(200).json({msg:req.body})
 try {
  // const {code,publisher,category,tag,price,templateName}= req.body
 
  let newUser={...req.body} 
 const published= await Published.create(newUser) 
 if(!req.body.publisherId){
  res.status(400).json(`can't publish template at the moment, please try again later!`)
 }  
 res.status(200).json(published) 
 } catch (error) {
  if(error.code=="11000"){
  return res.status(500).json({msg:"network error check network connection please"})
  } 
  }
//  console.log({msg:req.body})
}



module.exports= {publishTemplate,fetchPublished,fetchSinglePublished}