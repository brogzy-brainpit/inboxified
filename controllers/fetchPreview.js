const jwt= require("jsonwebtoken");
const User= require("../model/userAuth");   
require("dotenv").config() 


const createPreview= async(req,res)=>{
    try { 
       // let auth= req.headers.authorization
       let {id}= req.params
    const userId=id.split("$")[0]
    const templateId=id.split("$")[1]
       console.log(userId,templateId);
 
       const user = await User.findOne(
        { _id: userId, 'templates.tempId': templateId },
        { 'templates.$': 1 }
      ); 
      if (!user) {
        return res.status(404).send('User or friend not found');
      }    
    const code=user.templates[0]
       res.status(200).json({code}) 
      } catch (error) {
       
       res.status(403).json({error})
      }
    }
     
     


module.exports= {createPreview}