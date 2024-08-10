const amqplib = require('amqplib/callback_api');
const rabbitProvider=(amqp,res,options)=>{
  return  new Promise((resolve, reject) => {
        
        amqplib.connect(amqp.amqp, (err, connection) => {
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
                channel.assertQueue(amqp.queue, {
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
                        let sent = channel.sendToQueue(amqp.queue, Buffer.from(JSON.stringify(content)), {
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
                    let sent=0;
                    let list =["bok <dangabarin2020@gmail.com>","bulama<dangabarin2020@gmail.com>","bok <dangabarin2020@gmail.com>","chexa <dangabarin2020@gmail.com>","malo <dangabarin2020@gmail.com>","<muhammad <dangabarin2020@gmail.com>","musa <dangabarin2021@gmail.com>","garba <dangabarin2021@gmail.com>","hassan <dangabarin2021@gmail.com>","abdul <dangabarin2021@gmail.com>"]
                  console.log(options);
                    let sendNext = () => {
                        if (sent >=options.list.length) {
                        // if (sent >=6) {
                        
                            // res.status(200).json({msg:"all messages are processed...."})
                            // Close connection to AMQP server
                            // We need to call channel.close first, otherwise pending
                            // messages are not written to the queue
                            // console.log(sent);
                            console.log('All messages queued, ready to start sending!');
                           resolve('All messages sent!');
                            return channel.close(() => connection.close());
                        }
                            sent++;                
                            sender({
                                from :'template builder testing',
                                to:options.list[sent-1],
                                replyTo:"dangabarin2020@gmail.com",
                                subject: options.subject + sent,
                                text: 'hello world!',
                                html:options.ht,
                             
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
}
  

module.exports= {rabbitProvider}