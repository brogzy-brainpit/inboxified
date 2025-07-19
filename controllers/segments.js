const jwt= require("jsonwebtoken");
const User= require("../model/userAuth");
const mongoose =require("mongoose")


require("dotenv").config()
const getSegment= async(req,res)=>{
   const {email,publisherId}= req.body;
   const {id,segmentId}= req.params;
   console.log(req.params); 
   try {
    const ObjectId = mongoose.Types.ObjectId;
    User.findOne(
      { _id: new ObjectId(id) },
      {
        segments: {
          $filter: {
            input: "$segments",
            as: "segment",
            cond: { $eq: ["$$segment.id", segmentId] }
          }
        }
      }
    ).then(user => {
      console.log(user);
      
    res.status(200).send({user})
 
    }).catch(err => {
      console.error(err);
    }); 
 
   } catch (error) {
    res.status(500).send("network error, try checking your network connection")
   }
 }
const addSegment= async(req,res)=>{
    try {
       // let auth= req.headers.authorization
       let {name,id}= req.params
       let {email}= req.body
       console.log(id,email);
       const user= await User.findByIdAndUpdate(
          id,
          { 
             //  "$set": { "location": "lagos" },
              "$push": { "segments": req.body }
          }, 
          { "new": true, "upsert": true },
       
       )

   
       res.status(200).json({user})
      } catch (error) {
       
       res.status(403).send(error)
      }
    }
    const updateSegment= async(req,res)=>{
        try {
           // let auth= req.headers.authorization
           let {id}= req.params
           let {name,objectId}= req.body
           console.log(id,name);

           
           const user= await User.findOneAndUpdate(
              {_id:id,"segments.id":objectId},
              { 
                 //  "$set": { "location": "lagos" },
                  "$set": { 'segments.$.name': name }
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
   const deleteSegment= async(req,res)=>{
      try {
         // let auth= req.headers.authorization
         let {name,id}= req.params
         let {objectId}= req.body
        //  console.log(id,createdAt);
         const user= await User.findByIdAndUpdate(
            id,
            {  
               //  "$set": { "location": "lagos" },
                "$pull": { "segments":  {
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


module.exports= {addSegment,deleteSegment,updateSegment,getSegment}