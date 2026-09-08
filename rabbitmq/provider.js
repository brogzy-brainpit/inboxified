const amqplib = require('amqplib/callback_api');
const Handlebars = require('handlebars');
const apiKeys = require("../API");

const rabbitProvider = (amqp, subject, contacts, html,from,sendHTML,userId,plainText) => {
  Handlebars.registerHelper('gt',function
    (a, b, options) {
      if(a != null && a!== '' && a > b ){
        return options.fn(this) 
      }else {
        return options.inverse(this)
      }
  });

  let compileHtmlTemplate = null;
let compilePlainTextTemplate = null;
let compileSubjectTemplate = null;

// Only compile HTML if HTML sending is enabled
if (sendHTML && html) {
  compileHtmlTemplate = Handlebars.compile(html);
}

if (plainText) {
  compilePlainTextTemplate = Handlebars.compile(plainText);
}

if (subject) {
  compileSubjectTemplate = Handlebars.compile(subject);
}

 

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
  websiteRanking: c.websiteRanking ?? 0,
  name: (c.name && c.name !== 'null') ? c.name : '',
});
 
const contact = sanitizeContact(contacts[sent]);

let personalizedHtml = null;
let personalizedSubject = null;
let personalizedPlainText = null;

if (sendHTML && compileHtmlTemplate) {
  personalizedHtml = compileHtmlTemplate(contact);
}

if (compilePlainTextTemplate) {
  personalizedPlainText = compilePlainTextTemplate(contact);
}
if (compileSubjectTemplate) {
  personalizedSubject = compileSubjectTemplate(contact);
}
      
//  console.log(personalizedHtml)
          
          
            sender({
              from: from,
              to: contact.email,
              subject: `${personalizedSubject}`,
              html: personalizedHtml, 
              plainText: personalizedPlainText, 
              sendHTML,
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
