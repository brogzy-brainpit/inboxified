const jwt= require("jsonwebtoken");
const User= require("../model/userAuth");
const mongoose =require("mongoose")


require("dotenv").config()
const getAllBlog= async(req,res)=>{

  const {id}= req.params;
  try {
   const ObjectId = mongoose.Types.ObjectId;
   User.findOne(
     { _id: new ObjectId(id) },
     {
       blogs:1
       
     }
   ).then(user => {
     
   res.status(200).send({user})

   }).catch(err => {
     console.error(err);
   }); 

  } catch (error) {
   res.status(500).send("network error, try checking your network connection")
  }
}
const getBlog= async(req,res)=>{
  const {id,blogId}= req.params;
  try {
   const ObjectId = mongoose.Types.ObjectId;
   User.findOne(
     { _id: new ObjectId(id) },
     {
       blogs: {
         $filter: {
           input: "$blogs",
           as: "blog",
           cond: { $eq: ["$$blog.slug", blogId] }
         }
       } 
     }
   ).then(user => {     
   res.status(200).send({user})

   }).catch(err => {
     console.error(err);
   }); 
  } catch (error) {
   res.status(500).send("network error, try checking your network connection")
  }
}
const getMeta= async(req,res)=>{
  const {id}= req.params;
  try {
   const ObjectId = mongoose.Types.ObjectId;
   User.findOne(
     { _id: new ObjectId(id) },
     {
       templates:1
     }
   ).then(user => {     
   res.status(200).send({user})
   }).catch(err => {
     console.error(err);
   }); 

  } catch (error) {
   res.status(500).send("network error, try checking your network connection")
  }
}
const addBlog= async(req,res)=>{
    try {
       // let auth= req.headers.authorization
       let {name,id}= req.params
       let {email}= req.body
       console.log(id,email);
       const user= await User.findByIdAndUpdate(
          id,
          { 
             //  "$set": { "location": "lagos" },
              "$push": { "blogs": req.body }
          }, 
          { "new": true, "upsert": true },
       )

   
       res.status(200).json({user})
      } catch (error) {
       
       res.status(403).send(error)
      }
    }
    const updateBlog= async(req,res)=>{
        try {
           // let auth= req.headers.authorization
           let {id}= req.params
           let {name,objectId}= req.body
           console.log(id,name);

           
           const user= await User.findOneAndUpdate(
              {_id:id,"blogs.id":objectId},
              { 
                 //  "$set": { "location": "lagos" },
                  "$set": { 'blogs.$.name': name }
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
   const deleteBlog= async(req,res)=>{
      try {
         // let auth= req.headers.authorization
         let {name,id}= req.params
         let {objectId}= req.body
        //  console.log(id,createdAt);
         const user= await User.findByIdAndUpdate(
            id,
            {  
               //  "$set": { "location": "lagos" },
                "$pull": { "blogs":  {
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


module.exports= {addBlog,deleteBlog,updateBlog,getBlog,getMeta,getAllBlog}