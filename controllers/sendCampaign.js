const express= require("express");
const app= express();
const {rabbitProvider}= require("../rabbitmq/provider")
const {rabbitconsumer}= require("../rabbitmq/consumer")
const amqplib = require('amqplib/callback_api');
const schedule = require('node-schedule');
const humanInterval = require('human-interval');
const moment = require('moment');

const amqp={
    queue:"mailin",
    // amqp:"amqp://localhost"
    amqp:"amqps://uwthmtzs:By3QnH2o1V5ftClgiVlsOAVHM66Ov4Zv@cow.rmq2.cloudamqp.com/uwthmtzs"
  }
 
 
const campaign=async(req,res)=>{
    const{subject,mailList}=req.body
    const list= mailList.split(",")
    res.status(200).json({msg:{...req.body,mailList:list}}); 
    const immediately= humanInterval("1 seconds")
    const sendTime= new Date(Date.now() + immediately)
    console.log(moment().toDate(sendTime))
    const job= schedule.scheduleJob(req.body.sendTime,()=>{
        console.log(list);

     })
    //  const job= schedule.scheduleJob("* * * * * *",()=>{
    //     console.log(list);

    //  })
    let config= {
        host:"smtp.gmail.com",
        port: 465,
        secure: true, // use SSL  
         auth:{
                
                user:'dangabarin2020@gmail.com',
                pass:"yabccxpsciuoynqs"
            }, 
            
             
      } 
       let configx= {
        host:"smtp-mail.outlook.com",
            port:587,
           
            auth:{
                user:'dangabarin2023@outlook.com',
                pass:"Mimihaha2020!"
                
            }, 
             
             
      } 
   await  rabbitProvider(amqp,res,{...req.body,list})
  schedule.scheduleJob(req.body.sendTime,()=>{
       rabbitconsumer(amqp,res,config,list.length)
 })
       

     
    //    rabbitProvider(config,res).then(()=>{
    //     rabbitconsumer(config,res)
    //    })
     
   
       
   }
   module.exports={campaign}

























//    const express= require("express");
// const app= express();
// const {rabbitProvider}= require("../rabbitmq/provider")
// const {rabbitconsumer}= require("../rabbitmq/consumer")
// const amqplib = require('amqplib/callback_api');

// const amqp={
//     queue:"mailin",
//     // amqp:"amqp://localhost"
//     amqp:"amqps://uwthmtzs:By3QnH2o1V5ftClgiVlsOAVHM66Ov4Zv@cow.rmq2.cloudamqp.com/uwthmtzs"
//   }

 
// const campaign=async(req,res)=>{
//     const{subject,mailList}=req.body
//     const list= mailList.split(",")
//     // console.log(list);

//     let config= {
//         host:"smtp.gmail.com",
//         port: 465,
//         secure: true, // use SSL  
//          auth:{
                
//                 user:'dangabarin2020@gmail.com',
//                 pass:"yabccxpsciuoynqs"
//             }, 
            
             
//       } 
//        let configx= {
//         host:"smtp-mail.outlook.com",
//             port:587,
           
//             auth:{
//                 user:'dangabarin2023@outlook.com',
//                 pass:"Mimihaha2020!"
                
//             }, 
             
             
//       } 
//    await  rabbitProvider(amqp,res,{...req.body,list})
//         rabbitconsumer(amqp,res,config,list.length)
       
//    }
//    module.exports={campaign}