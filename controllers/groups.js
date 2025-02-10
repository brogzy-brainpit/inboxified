const jwt= require("jsonwebtoken");
const User= require("../model/userAuth");

require("dotenv").config()
const addGroups= async(req,res)=>{
    try {
       // let auth= req.headers.authorization
       let {name,id}= req.params
       let {email}= req.body
       console.log(id,email);
       const user= await User.findByIdAndUpdate(
          id,
          { 
             //  "$set": { "location": "lagos" },
              "$push": { "groups": req.body }
          }, 
          { "new": true, "upsert": true },
       
       )

   
       res.status(200).json({user})
      } catch (error) {
       
       res.status(403).send(error)
      }
    }
    const updateGroups= async(req,res)=>{
        try {
           // let auth= req.headers.authorization
           let {id}= req.params
           let {email,name}= req.body
           console.log(id,email);

           
           const user= await User.findOneAndUpdate(
              {_id:id,"contacts.name":name},
              { 
                 //  "$set": { "location": "lagos" },
                  "$set": { 'contacts.$.email': email }
              }, 
              { "new": true, "upsert": true ,},
           
           )
         //   console.log(user);
       
           res.status(200).json({user})
          } catch (error) {
           console.log(error);
           res.status(403).send(error)
          }
        }
   const deleteGroups= async(req,res)=>{
      try {
         // let auth= req.headers.authorization
         let {name,id}= req.params
         let {objectId}= req.body
        //  console.log(id,createdAt);
         const user= await User.findByIdAndUpdate(
            id,
            {  
               //  "$set": { "location": "lagos" },
                "$pull": { "groups":  {
                  "id": objectId,
               
              } }
            }, 
            { "new": true, "upsert": true },
         
         )
      
         res.status(200).json({user})
        } catch (error) {
         console.log(error);
         res.status(403).send(error)
        }
      }


module.exports= {addGroups,deleteGroups,updateGroups}