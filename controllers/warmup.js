const jwt= require("jsonwebtoken");
const User= require("../model/userAuth");

const nodemailer = require('nodemailer');
require("dotenv").config()


const addWarmupInbox = async (req, res) => {
  try {
    const { id } = req.params;
    const { inbox, appPassword, provider,isListener, dailyLimit, dailyIncrease,firstName, } = req.body;

    // 1. Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: inbox,
        pass: appPassword,
      },
    });

    // 2. Try verifying credentials
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error("❌ Invalid email/app password:", verifyError.message);
      return res.status(401).json({ message: "Invalid email or app password" });
    }

    // 3. Find user
    const user = await User.findById(id);
    if (!user) return res.status(404).send('User not found');

    // 4. Check for duplicates
    const alreadyExists = user.warmupInboxes.some(
      (entry) => entry.inbox.toLowerCase() === inbox.toLowerCase()
    );
    if (alreadyExists) {
      return res.status(409).json({ message: "Inbox already added." });
    }

    // 5. Add inbox
    user.warmupInboxes.push({
      inbox, 
      appPassword,
      isListener,
      provider,
      dailyLimit,
      firstName,
      dailyIncrease, 
      createdAt: Date.now(),
    });

    await user.save();
    console.log({ user: user.warmupInboxes });

    return res.status(200).json({ message: "Warmup inbox added.", user });

  } catch (error) {
    console.error("Error adding warmup inbox:", error);
    return res.status(500).send("Server error");
  }
};



    const getWarmupInbox= async(req,res)=>{
      try {
         let {name,id}= req.params
         const user= await User.findById(id);     
         res.status(200).json({warmupInboxes:user.warmupInboxes})
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
    const updateWarmupInbox= async(req,res)=>{

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
   const deleteWarmupInbox= async(req,res)=>{
      try {
         // let auth= req.headers.authorization
         let {id}= req.params
         let {inbox}= req.body
         console.log(id,inbox);
         const user= await User.findByIdAndUpdate(
            id,
            { 
               //  "$set": { "location": "lagos" },
                "$pull": { "warmupInboxes":  {
                  "inbox": inbox,
               
              } } 
            }, 
            { "new": true, "upsert": true },
         
         )     
         res.status(200).json({msg:`inbox >>${inbox}<< deleted successfully`})
        } catch (error) {
         console.log(error);
         res.status(403).send(error)
        }  
      }

   

module.exports= {getWarmupInbox,addWarmupInbox,updateWarmupInbox,deleteWarmupInbox}