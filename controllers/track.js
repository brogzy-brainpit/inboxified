const jwt= require("jsonwebtoken");
const User= require("../model/userAuth");
const Track= require("../model/campaignAuth");
// const userAgentParser = require('user-agent-parser');
 const userAgentParser = require("ua-parser-js");
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
 
const openRate = async (req, res) => {
  const {guid} = req.params;
//   if (guid.endsWith('.png')) {
//   guid = guid.replace(/\.png$/, '');
// }
  const email = req.query.email?.toLowerCase().trim();

  try {
    if (!guid || !email) return res.status(400).send("Missing guid or email");

    const campaign = await Track.findOne({ trackerId: guid });
    if (!campaign) return res.status(404).send("Campaign not found");

    const subscriber = campaign.totalSubscribers.find(sub => sub.email.toLowerCase() === email);
    if (!subscriber) return res.status(404).send("Subscriber not in this campaign");

    const trackingUserId = campaign.trackingUser;

    // ✅ Always increment emailOpens
    const userUpdate = {
      $inc: { "contacts.$.emailOpens": 1 },
      $set: { "contacts.$.condition": "verified" } // ✅ Mark as verified
    };

  const userAgent = req.headers["user-agent"];
  const deviceInfo = userAgentParser(userAgent);
    // ✅ Only on first open
    if (!subscriber.opened) {
      subscriber.opened = true;
      subscriber.openAt = new Date();
      campaign.opens += 1;
      campaign.stats.push({
      type: "click",
      date: Date.now(),
      devices: {
        type: deviceInfo.device.type || "unknown",
        os: deviceInfo.os.name || "unknown",
      },
      emailClients: deviceInfo.browser.name || "unknown",
    });

      userUpdate.$inc["contacts.$.totalOpens"] = 1;

      await campaign.save();
    }

    // ✅ Update user's contact in database
    const updateResult = await User.updateOne(
      { _id: trackingUserId, "contacts.email": email },
      userUpdate
    );

    if (updateResult.modifiedCount === 0) {
      console.warn("⚠️ No contact updated. Possibly wrong email or user ID.");
    }

    // ✅ Return tracking pixel
    const img = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACfsD/qHTGSoAAAAASUVORK5CYII=",
      "base64"
    );
    res.set("Content-Type", "image/png");
    res.send(img);

  } catch (err) {
    console.error("❌ openRate error:", err);
    res.status(500).send("Server error");
  }
};


   

const clickRate = async (req, res) => {
  const { guid } = req.params;
  const email = req.query.email;
  const url = req.query.url;

  const userAgent = req.headers["user-agent"];
  const deviceInfo = userAgentParser(userAgent);

  console.log("Missing guid, url, or email");
  if (!guid || !url || !email) {
   
    return res.status(400).json({ msg: "Missing guid, url, or email" });
  }

  try {
    // 1️⃣ Update campaign tracking
    const campaign = await Track.findOne({ trackerId: guid });
    if (!campaign) {
      return res.status(404).json({ msg: "Campaign not found" });
    }

    const subscriber = campaign.totalSubscribers.find(
      (sub) => sub.email.toLowerCase() === email
    );
    if (!subscriber) {
      return res.status(404).json({ msg: "Subscriber not in campaign" });
    }
 const userUpdate = {
      $inc: { "contacts.$.emailClicks": 1 },
      $set: { "contacts.$.condition": "verified" }, // ✅ Mark as verified
       $push: {
          "contacts.$.clicks": {
            url,
            clickedAt: new Date(),
          }
          },
    };
     subscriber.clickedLinks.push({
  url,
  at: Date.now(),
});
if (!subscriber.opened) {
    userUpdate.$inc["contacts.$.totalOpens"] = 1;
  }
    if (!subscriber.clicked) {
      subscriber.clicked = true;
      subscriber.opened = true;
      subscriber.clickAt = new Date();
      subscriber.openAt = new Date();
      campaign.opens += 1;
      campaign.stats.push({
      type: "click",
      date: Date.now(),
      devices: {
        type: deviceInfo.device.type || "unknown",
        os: deviceInfo.os.name || "unknown",
      },
      emailClients: deviceInfo.browser.name || "unknown",
    });
    userUpdate.$inc["contacts.$.totalClicks"] = 1;
  
      campaign.clicks += 1;
      campaign.stats.push({
        type: "click",
        date: Date.now(),
        devices: {
          type: deviceInfo.device.type || "unknown",
          os: deviceInfo.os.name || "unknown",
        },
        emailClients: deviceInfo.browser.name || "unknown",
      });
  
      await campaign.save();
    }


    // 2️⃣ Update User Contact (push URL + timestamp)
    // const userId = campaign.trackingUser;
    const trackingUserId = campaign.trackingUser;
    // await User.updateOne(
    //   { _id: userId, "contacts.email": email },
    //   {
    //     $inc: { "contacts.$.totalClicks": 1 },
    //     $set: { "contacts.$.clickAt": new Date() }, // update every time (optional)
    //     $push: {
    //       "contacts.$.clicks": {
    //         url,
    //         clickedAt: new Date(),
    //       },
    //     },
    //   }
    // );

    // ✅ Update user's contact in database
    const updateResult = await User.updateOne(
      { _id: trackingUserId, "contacts.email": email },
      userUpdate
    );

    if (updateResult.modifiedCount === 0) {
      console.warn("⚠️ No contact updated. Possibly wrong email or user ID.");
    }

    // 3️⃣ Redirect
    return res.redirect(url);
  } catch (error) {
    console.error("❌ Click tracking failed:", error.message);
    return res.status(500).json({ msg: "Something went wrong, try again later." });
  }
};

    
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