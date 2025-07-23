const amqplib = require('amqplib/callback_api');
const Handlebars = require('handlebars');
const apiKeys = require("../API");

const rabbitProvider = (amqp, subject, contacts, html,from,sendHTML,userId) => {
  Handlebars.registerHelper('gt',function
    (a, b, options) {
      if(a != null && a!== '' && a > b ){
        return options.fn(this) 
      }else {
        return options.inverse(this)
      }
  });
  const compileTemplate = Handlebars.compile(html);

  return new Promise((resolve, reject) => {
    amqplib.connect(amqp.amqp, (err, connection) => {
      if (err) {
        console.error(err.stack);
        return reject(err); 
      }

      connection.createChannel((err, channel) => {
        if (err) {
          console.error(err.stack);
          return reject(err);
        }

        channel.assertQueue(amqp.queue, { durable: true }, err => {
          if (err) {
            console.error(err.stack);
            return reject(err);
          }

          let sent = 0;

          const sender = (content, next) => {
            const sentOk = channel.sendToQueue(
              amqp.queue,
              Buffer.from(JSON.stringify(content)),
              {
                persistent: true,
                contentType: 'application/json'
              }
            );
            if (sentOk) next();
            else channel.once('drain', next);
          };

          const sendNext = () => {
            if (sent >= contacts.length) {
              console.log('All messages queued, ready to start sending!');
              return channel.close(() => {
                connection.close();
                resolve('All messages queued, ready to start sending!');
              });
            }

            const sanitizeContact = (c) => ({
  ...c,
  website: (c.website && c.website !== 'null') ? c.website : '',
  websiteRanking: c.websiteRanking || ' ',
  name: (c.name && c.name !== 'null') ? c.name : '',
});


const contact = sanitizeContact(contacts[sent]);
const personalizedHtml = compileTemplate(contact);

           console.log(personalizedHtml)
          
          
            sender({
              from: from,
              to: contact.email,
              subject: `${subject} ${sent + 1}`,
              html: personalizedHtml, 
              sendHTML:sendHTML,
              userId,
              id: apiKeys()
            }, () => {
              sent++;
              sendNext();
            });
          };

          sendNext();
        });
      });
    });
  });
};

module.exports = { rabbitProvider };
