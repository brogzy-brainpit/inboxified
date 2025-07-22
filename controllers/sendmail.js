const express= require("express");
const app= express();
const {rabbitProvider}= require("../rabbitmq/provider")
const {rabbitconsumer}= require("../rabbitmq/consumer")
const amqplib = require('amqplib/callback_api');
const nodemailer= require('nodemailer')
require("dotenv").config();



const amqp={
    queue:"mailin",
    // amqp:"amqp://localhost",
    amqp:process.env.AMQP_URL  // global
  }

 
const previewMail=async(req,res)=>{
    const{subject,mailList,ht}=req.body
    const list= mailList.split(",")
    console.log(list)
try {
    let config= {
        host:"smtp.gmail.com",
        port: 465,
        secure: true, // use SSL  
         auth:{ 
                user:'dangabarin2020@gmail.com',
                pass:"yabccxpsciuoynqs"
            },      
      } 
    const mail_config={
        from :'memet omar <dangabarin2020@gmail.com>',
        to:mailList,
        replyTo:"dangabarin2020@gmail.com",
        subject: subject,
        text: 'hello world!',
        html:ht,  
        list: {
            // List-Help: <mailto:admin@example.com?subject=help>
            help: 'memetoumar@gmail.com?subject=help',
            // List-Unsubscribe: <http://example.com> (Comment)
            unsubscribe: {
                url: 'http://google.com/search',
                comment: 'Click here to unsubscribe'
            },
            // List-Subscribe: <mailto:admin@example.com?subject=subscribe>
            // List-Subscribe: <http://example.com> (Subscribe)
            // subscribe: [
            //     'admin@example.com?subject=subscribe',
            //     {
            //         url: 'http://example.com',
            //         comment: 'Subscribe'
            //     }
            // ],
           
          
        } 
      }
      let transport =nodemailer.createTransport(config)
     // Send the message using the previously set up Nodemailer transport
     transport.sendMail(mail_config, (err, info) => {
      if (err) {
          console.error(err.stack);
          // put the failed message item back to queue
           channel.nack(data);
      }
     
      console.log('Delivered message %s', info);
      res.status(200).json({msg:"email sent successfully!"})
  }) 
    
} catch (error) {
    res.status(500).json({msg:"something went wrong!"}) 
}


//    await  rabbitProvider(amqp,res,{...req.body,list})
        // rabbitconsumer(amqp,res,config,list.length)
       

     
    //    rabbitProvider(config,res).then(()=>{
    //     rabbitconsumer(config,res)
    //    })
     
   
       
   }
   const schedule=async(req,res)=>{
    const{subject,mailList,ht,schedule,sendTime}=req.body
    // const contact= mailList.split(",")
    console.log(schedule)
    console.log(sendTime)
    console.log(subject)
    console.log(mailList )
    console.log(ht)
    let contact=[
        {
            name:'kwatani',
            email:'memetsamples@gmail.com',
            website:'dd.com'
        },  {
            name:'mome',
            email:'memetsamples@gmail.com',
            website:'samples.com'
        },  {
            name:'brogzy',
            email:'memetsamples@gmail.com',
            website:'dan.com'
        },
    ]

try {
    
  await rabbitProvider(amqp,subject,list=contact,ht)
   res.status(200).send(`All messages queued, ready to start sending!`)
        
}catch{
res.status(500).send('server error ')
}

       
   }
     const mail=async(req,res)=>{
    const{subject,mailList,ht,from,sendHTML,userId}=req.body
    // const contact= mailList.split(",")
    // console.log(ht)
   // 1. Compile the raw HTML with Handlebars
 
let contacts=[
  {
    name: 'musa',
    email: 'memetsamples@gmail.com',
    group: [],
    age: 0,
    category: 'videography',
    phone: '',
    website: 'gumal.com',
    state: 'null',
    websiteRanking: 0,
    status: 'active',
    condition: 'verified',
    signUpSource: 'uploaded csv',
    emailOpens: 0,
    emailSent: 0,
    emailClicks: 0,
    openRate: 0,
    clickRate: 0,
    createdAt: '2025-07-18T14:21:44.783Z',
    _id: '687a5878c465d33098d763d1'
  },
  {
    name: 'abba',
    email: 'memetsamples@gmail.com',
    group: [],
    age: 0,
    category: 'welding',
    phone: '',
    website: 'null',
    state: 'null',
    websiteRanking: 0,
    status: 'active',
    condition: 'unverified',
    signUpSource: 'uploaded csv',
    emailOpens: 0,
    emailSent: 0,
    emailClicks: 0,
    openRate: 0,
    clickRate: 0,
    createdAt: '2025-07-18T14:21:44.783Z',
    _id: '687a5878c465d33098d763d2'
  },
  {
    name: 'hassan',
    email: 'memetsamples@gmail.com',
    group: [],
    age: 0,
    category: 'null',
    phone: '',
    website: 'null',
    state: 'null',
    websiteRanking: 0,
    status: 'active',
    condition: 'verified',
    signUpSource: 'uploaded csv',
    emailOpens: 0,
    emailSent: 0,
    emailClicks: 0,
    openRate: 0,
    clickRate: 0,
    createdAt: '2025-07-18T14:21:44.783Z',
    _id: '687a5878c465d33098d763d3'
  }
]

    console.log(` the user id frorv ${userId}`)
try {
    
  await rabbitProvider(amqp,subject,list=mailList,ht,from,sendHTML,userId)
   res.status(200).send(`All messages queued, ready to start sending!`)
        
}catch{
res.status(500).send('server error ')
}

       
   }

   module.exports={mail,schedule,previewMail}