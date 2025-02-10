const jwt= require("jsonwebtoken");
const User= require("../model/userAuth");

require("dotenv").config()
const addSubscriber= async(req,res)=>{
    try {
       // let auth= req.headers.authorization
       let {name,id}= req.params
       let {email}= req.body
      //  console.log(req.body);
      //  const user= await User.findByIdAndUpdate(
      //     id,
      //     { 
      //        //  "$set": { "location": "lagos" },
      //         "$push": { "contacts": req.body }
      //     }, 
      //     { "new": true, "upsert": true },
       
      //  )   
      const user = await User.findById(id);
      if (!user) return res.status(404).send('User not found');

      user.contacts.push(req.body);  // `createdAt` will be automatically set by MongoDB
      await user.save();
       res.status(200).json({user})
      } catch (error) {
       console.log(error);
       res.status(403).send(error)
      }
    }
    const getSubscriber= async(req,res)=>{
      try {
         // let auth= req.headers.authorization
         let {name,id}= req.params
         let {email}= req.body
         console.log(id,email); 
         const user= await User.findByIdAndUpdate({id:id}
         )
         console.log(user);
     
         res.status(200).json({user})
        } catch (error) {
         console.log(error);
         res.status(403).send(error)
        }
      }
      const getSegmentSubscriber= async(req,res)=>{
         try {
            // let auth= req.headers.authorization
            let {name,id}= req.params
            let {email}= req.body
            console.log(id,email); 
            const user= await User.findByIdAndUpdate({id:id}
            )
            console.log(user);
        
            res.status(200).json({user})
           } catch (error) {
            console.log(error);
            res.status(403).send(error)
           }
         }
    const updateSubscriber= async(req,res)=>{

      // suggested by AI
      // suggested by AI
      // suggested by AI
   //    const user = await User.findOneAndUpdate(
   //       { _id: userId, 'subscribers._id': subscriberId },
   //       { 
   //           $set: { 
   //               'subscribers.$.name': req.body.name, 
   //               'subscribers.$.email': req.body.email 
   //           } 
   //       },
   //       { new: true } // Return the updated document
   //   );

   //   if (!user) {
   //       return res.status(404).send('User or subscriber not found');
   //   }

   //   res.status(200).send(user);
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
           console.log(user);
       
           res.status(200).json({user})
          } catch (error) {
           console.log(error);
           res.status(403).send(error)
          }
        }
   const deleteSubscriber= async(req,res)=>{
      try {
         // let auth= req.headers.authorization
         let {name,id}= req.params
         let {email}= req.body
         console.log(id,email);
         const user= await User.findByIdAndUpdate(
            id,
            { 
               //  "$set": { "location": "lagos" },
                "$pull": { "contacts":  {
                  "email": email,
               
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

module.exports= {getSubscriber,addSubscriber,deleteSubscriber,updateSubscriber}