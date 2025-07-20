const jwt= require("jsonwebtoken");
const User= require("../model/userAuth");
const Track= require("../model/campaignAuth");
const userAgentParser = require('user-agent-parser');
require("dotenv").config()
const emailStats = {};





const publishTrack= async(req,res)=>{
  //  res.status(200).json({msg:req.body})
   try {
    const {campaign,open,trackerId,createdAt,totalSubscribers,clicks,emailClients,readDuration}= req.body
   
    let newTracker={...req.body}
    // console.log(req.body);
   const published= await Track.create(newTracker) 
  //  const published= await Track.create({campaign,open,trackerId,createdAt,totalSubscribers,clicks,readDuration}) 
   if(!req.body.trackerId){
    res.status(400).json(`can't create campaign at the moment, please try again later!`)
   }  
   res.status(200).json(published) 
   } catch (error) {
    if(error.code=="11000"){
    return res.status(500).json({msg:"network error check network connection please"})
    } 
    }
  //  console.log({msg:req.body})
  }
const getSingleTracker= async(req,res)=>{
  try {
    let {id}= req.params
       let {trackerId}= req.query 
       console.log(id,trackerId); 
       const tracker= await Track.find({trackerId}) 
     console.log(tracker);
 
     res.status(200).json({oneTracker:tracker})
    } catch (error) {
     console.log(error);
     res.status(403).send(error)
    }
  }
  const userTrackers= async(req,res)=>{
    try {
       // let auth= req.headers.authorization
       let {id}= req.params
      //  let {email}= req.body
       console.log(id); 
       const user= await Track.find({trackingUser:id})
       console.log(user);
   
       res.status(200).json({user})
      } catch (error) {
       console.log(error);
       res.status(403).send(error)
      }
    }
 



const openRatex = async (req, res) => {
  const { trackingId } = req.params;
  const { email } = req.query;

  try {
    const campaign = await Track.findOne({ trackerId: trackingId });
    if (!campaign) return res.status(404).send("Campaign not found");

    // Find subscriber by email
    const subscriber = campaign.totalSubscribers.find(sub => sub.email === email);
    if (!subscriber) return res.status(404).send("Subscriber not found");

    // Only update if not already opened
    if (!subscriber.opened) {
      subscriber.opened = true;
      subscriber.openAt = new Date();
      campaign.opens += 1;

      // Optional: record stats
      campaign.stats.push({
        type: "open", 
        emailClients: req.headers["user-agent"],
        devices: {
          type: "unknown",
          os: "unknown"
        },
      });

      await campaign.save();
    }

    // Return a 1x1 pixel
    res.set("Content-Type", "image/png");
    res.send(Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACfsD/qHTGSoAAAAASUVORK5CYII=", "base64"));
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

const openRate = async (req, res) => {
  const { trackingId } = req.params;
  const email = req.query.email?.toLowerCase().trim();

  try {
    const campaign = await Track.findOne({ trackerId: trackingId });
    if (!campaign) return res.status(404).send("Campaign not found");

    const subscriber = campaign.totalSubscribers.find(sub => sub.email.toLowerCase() === email);
    if (!subscriber) return res.status(404).send("Subscriber not in this campaign");

    if (!subscriber.opened) {
      // ✅ 1. Update the campaign
      subscriber.opened = true;
      subscriber.openAt = new Date();
      campaign.opens += 1;
      campaign.stats.push({
        type: "open",
        date: Date.now(),
        emailClients: req.headers["user-agent"],
        devices: { type: "unknown", os: "unknown" }
      });
      await campaign.save();

      // ✅ 2. Update the user's contact info
      const trackingUserId = campaign.trackingUser;

      await User.updateOne(
        { _id: trackingUserId, "contacts.email": email },
        { $inc: { "contacts.$.totalOpens": 1 } }
      );
    }

    // ✅ Return pixel
    const img = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACfsD/qHTGSoAAAAASUVORK5CYII=",
      "base64"
    );
    res.set("Content-Type", "image/png");
    res.send(img);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};



     const clickRate= async(req,res)=>{
        try {
          const { guid } = req.params;
          const { url} = req.query;
          console.log(url);
         const userAgent = req.headers['user-agent'];
         const deviceInfo = userAgentParser(userAgent);
         if(guid && url){
            const updateTracker= await Track.findOneAndUpdate({trackerId:guid},{
               $inc:{clicks:1},
               $push:{stats:
                 { 
                   type:"click",
                   date:Date.now(),
                   devices:{type:deviceInfo.device.type || "unknown",os:deviceInfo.os.name || "unknown"},
                 emailClients:deviceInfo.browser.name || "unknown",
                 }
               },
             })
             if(updateTracker){
           res.redirect(url)
             }else{
           res.status(404).json({msg:error})
             }
             
           }else{
             res.status(404).json({msg:" no guid provided"})
           }
           } catch (error) {
           res.status(500).json({msg:"something went wrong, try again later!"})
             
           }
        }
    
    
      const trackStats= async(req,res)=>{
        const { guid } = req.params;
        console.log(guid);
        if (emailStats[guid]) { 
          res.json(emailStats[guid]); 
       } 
       else
        { 
          res.status(404).send('No stats found for this guid');
       }
        }

        const deleteTrack= async(req,res)=>{
          res.json("start functionalites");
           
            }
      
  

module.exports= {publishTrack,trackStats,deleteTrack,userTrackers,getSingleTracker,openRate,clickRate}