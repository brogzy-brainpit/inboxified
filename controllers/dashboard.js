const jwt= require("jsonwebtoken");
const User= require("../model/userAuth");

require("dotenv").config()


   const test= async(req,res)=>{
      try {
         let auth= req.headers.authorization
         const token= auth.split("Bearer ")[1]
         let decodedUser= jwt.verify(token,process.env.JWT_SECRET)
     console.log(decodedUser);
         const user= await User.findByIdAndUpdate(
            decodedUser.id,
            { 
               //  "$set": { "location": "lagos" },
                "$pull": { "contacts":  {
                  "name": "yusuf",
                 
              } } 
            }, 
            { "new": true, "upsert": true },
          
         )
         console.log(user);
     
         res.status(200).json({user})
        } catch (error) {
         console.log(error);
         res.status(403).send(error)
        }
      }
const dashboard=async(req,res)=>{
   try {
    let auth= req.headers.authorization
    const token= auth.split("Bearer ")[1]
    let decodedUser= jwt.verify(token,process.env.JWT_SECRET)

    const user= await User.findOne({_id:decodedUser.id})
    console.log(user);

    res.status(200).json({user})
   } catch (error) {
      console.log(error)
    res.status(403).send({msg:"invalid token",error})
   }
}
module.exports= {dashboard,test}