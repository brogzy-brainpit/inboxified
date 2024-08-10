const express= require("express");
const app= express();
const cors=require("cors");
const nodemailer=require("nodemailer");
require("dotenv").config();
const {connectDb}=require("./db/connectDb");
const auth=require("./routes/createUser");
const {rabbitProvider}= require("./rabbitmq/provider")
const amqplib = require('amqplib/callback_api');


const port= process.env.PORT||5000;
app.use(express.json())
app.use(cors())
app.use("/api/v1/auth",auth)
app.get("/image",(req,res)=>{
    const {by} =req.query
    console.log(by)
    console.log(`am called by ${by}` );
    res.status(200).send("https://gen.sendtric.com/countdown/p6qr4tj37n")
})

const config={
    queue:"mails",
    amqp:"amqp://localhost"
  }
app.post("/api/v1/sendTestMail",(req,res)=>{
    const{subject,mailList}=req.body
   const to= mailList.split(",")
   console.log(to);
   const config={
    queue:"mails",
    amqp:"amqp://localhost"
  }
  
  rabbitProvider(config)
   
     
   
       
   })
  
   app.get("/api/v1/sendTestMail",(req,res)=>{
    amqplib.connect('amqp://localhost', (err, connection) => {
        if (err) {
            console.error(err.stack);
            return process.exit(1);
        }
      
        // Create channel
        connection.createChannel((err, channel) => {
            if (err) {
                console.error(err.stack);
                return process.exit(1);
            }
      
            // Ensure queue for messages
            channel.assertQueue(config.queue, {
                // Ensure that the queue is not deleted when server restarts
                durable: true
            }, err => {
                if (err) {
                    console.error(err.stack);
                    return process.exit(1);
                }
      
                // Create a function to send objects to the queue
                // Javascript object is converted to JSON and then into a Buffer
                let sender = (content, next) => {
                    let sent = channel.sendToQueue(config.queue, Buffer.from(JSON.stringify(content)), {
                        // Store queued elements on disk
                        persistent: true,
                        contentType: 'application/json'
                    });
                    if (sent) {
                        return next();
                    } else {
                        channel.once('drain', () => next());
                    }
                };
      
                // push 100 messages to queue
                let sent = 0;
                let list =["empty transport","bok <dangabarin2020@gmail.com>","chexa <dangabarin2020@gmail.com>","malo <dangabarin2020@gmail.com>","<muhammad <dangabarin2020@gmail.com>","musa <dangabarin2021@gmail.com>","garba <dangabarin2021@gmail.com>","hassan <dangabarin2021@gmail.com>","abdul <dangabarin2021@gmail.com>"]
                let sendNext = () => {
                    // if (sent >=list.length-1 || sent ==1) {
                        if (sent >=100) {
                      console.log(list.length);
                        console.log('All messages sent!');
                        res.status(200).json({msg:"all messages send successfully"})
                        // Close connection to AMQP server
                        // We need to call channel.close first, otherwise pending
                        // messages are not written to the queue
                        return channel.close(() => connection.close());
                    }
                    sent++;                
                    sender({
                        service:"gmail",
                        port:587,
                        to:["dangabarin2020@gmail.com"],
                        subject: 'Test message #' + sent,
                        text: 'hello world!',
                    }, sendNext);
                    // sender({
                    //     to: list[sent] || "dangabarin2005@gmail.com",
                    //     subject: 'Test message #' + sent,
                    //     text: 'hello world!'
                    // }, sendNext);
                };
      
                sendNext();
      
            });
        });
      });
     
   
       
   })
// offline server
// var transport =nodemailer.createTransport({
//     service:"gmail",
//     port:587,
//     auth:{
//         user:'dangabarin2020@gmail.com',
//         pass:"ohsdkshebmmfrzsb"
//     },
   
// });
    // const mail_config={
    //     // khalifah="mhhammadrufai49@gmail.com"
    //     from: ` mome <dangabarin2020@gmail.com>`, // sender address
    //     // to: "dangabarin2020@gmail.com,services.1017mail@contractor.net,dangabarin2020@outlook.com", // list of receivers
    //     to, // list of receivers
    //     // bcc: "Send2usi@gmail.com,aiahmaddeen@gmail.com,dangabarin2020@gmail.com,dangabarin2021@gmail.com", // list of receivers
    //     // Bcc: "dangabarin2020@gmail.com,dangabarin2021@gmail.com, baz@example.com", // list of receivers
    //     subject, // Subject line
    //     replyTo:"dangabarin2020@gmail.com",
    //      // text: `Hello its   from 1017mail`, // plain text body
    //     html:req.body.ht ,// html body,
    

        
    //   }
app.listen(port,()=>{
    console.log(`port ${port} staedy and grinding...`)
})
// console.log(process.env.CONNECTDB);
const startServer=async()=>{
try {
    await connectDb(process.env.CONNECTDB).then(()=>{
        console.log("connected successfully...");
    })

    app.listen(port,()=>{
        console.log(`port ${port} staedy and grinding...`)
    })
} catch (error) {
    console.log(error)
}
}
// startServer()