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
    console.log(req.body);
   const published= await Track.create(newTracker) 
  //  const published= await Track.create({campaign,open,trackerId,createdAt,totalSubscribers,clicks,readDuration}) 
   if(!req.body.trackerId){
    res.status(400).json(`can't publish template at the moment, please try again later!`)
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
    const openRate= async(req,res)=>{
      
      try {
     const { guid } = req.params;
    const userAgent = req.headers['user-agent'];
    const deviceInfo = userAgentParser(userAgent);
    // $addToSet:{
    //   devices:{type:deviceInfo.device.type || "unknown",os:deviceInfo.os.name || "unknown"},
    //   emailClients:deviceInfo.browser.name || "unknown",
    // }
    if(guid){

       const updateTracker= await Track.findOneAndUpdate({trackerId:guid},{
          $inc:{opens:1},
          $push:{stats:
            { 
              type:"open",
              date:Date.now(),
              devices:{type:deviceInfo.device.type || "unknown",os:deviceInfo.os.name || "unknown"},
            emailClients:deviceInfo.browser.name || "unknown",
            }
          },
          // $setOnInsert:{clicks:0,devices:{},emailClients:{},readDurations:[]},
          // $addToSet:{
          //   devices:{type:deviceInfo.device.type || "unknown",os:deviceInfo.os.name || "unknown"},
          //   emailClients:deviceInfo.browser.name || "unknown",

          // }
        })
        if(updateTracker){
         // Respond with a 1x1 transparent pixel
    const img = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/pmFEkYAAAAASUVORK5CYII=',
        'base64'
    );
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });
    res.end(img);

        }else{
      res.status(404).json({msg:"something went wrong updating trackers"})

        }
        
      }else{
        res.status(404).json({msg:" no guid provided"})
      }
      } catch (error) {
      res.status(500).json({msg:"something went wrong, try again later!"})
        
      }

        
    }
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