const jwt= require("jsonwebtoken");
// const User= require("../model/userAuth");
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
 


const openRatex= async (req, res) => {
  const { guid } = req.params;
  const email = req.query.email; // must be added to the pixel URL
console.log(email)
console.log(guid)
  try {
    if (!guid || !email) return res.status(400).end();

    const tracker = await Track.findOne({ trackerId: guid });
    if (!tracker) return res.status(404).end();

    const subscriberIndex = tracker.totalSubscribers.findIndex(sub => sub.email === email);

    if (subscriberIndex !== -1 && !tracker.totalSubscribers[subscriberIndex].opened) {
      tracker.totalSubscribers[subscriberIndex].opened = true;
      tracker.totalSubscribers[subscriberIndex].openAt = new Date();
      tracker.opens += 1;
      tracker.stats.push({
        type: "open",
        emailClients: req.headers["user-agent"],
        date: new Date(),
      });

      await tracker.save();
    }

    // 1x1 pixel transparent image response
    const pixel = Buffer.from(
      "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
      "base64"
    );
    res.setHeader("Content-Type", "image/gif");
    res.setHeader("Content-Length", pixel.length);
    res.end(pixel);

    
  } catch (err) {
    res.status(500).end();
  }
};
const openRate = async (req, res) => {
  const { guid } = req.params;
  const email = req.query.email?.toLowerCase().trim();

  try {
    const campaign = await Track.findOne({ trackerId: guid });
    if (!campaign) return res.status(404).send("Campaign not found");

    const subscriber = campaign.totalSubscribers.find(sub => sub.email.toLowerCase() === email);
    if (!subscriber) return res.status(404).send("Subscriber not in this campaign");

    const trackingUserId = campaign.trackingUser;

    // ✅ Increment `emailOpens` for every open, even repeat ones
    const userUpdate = {
      $inc: { "contacts.$.emailOpens": 1 }
    };

    // ✅ If this is the first open, also set 'opened', 'openAt', increment total opens, etc.
    if (!subscriber.opened) {
      subscriber.opened = true;
      subscriber.openAt = new Date();
      campaign.opens += 1;
      campaign.stats.push({
        type: "open",
        date: Date.now(),
        emailClients: req.headers["user-agent"],
        devices: { type: "unknown", os: "unknown" }
      });

      userUpdate.$inc["contacts.$.totalOpens"] = 1;

      await campaign.save();
    }

    // ✅ Update user contacts
    await User.updateOne(
      { _id: trackingUserId, "contacts.email": email },
      userUpdate
    );

    // ✅ Return tracking pixel
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