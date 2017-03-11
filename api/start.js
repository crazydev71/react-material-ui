import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import requireDir from 'require-dir';
import cors from 'cors';
import logger from 'morgan';
import { ValidationError } from 'property-validator';
import twilioLibrary from 'twilio';
import DB from './db';
const { TWILIO_SID, TWILIO_SECRET, MALE, FEMALE, SMS_FROM } = process.env;
const Contact = DB.Model.extend({ tableName: 'contact' });
const accountSid = TWILIO_SID;
const authToken = TWILIO_SECRET;

const app = express();
app.set('port', 5000);

app.use([
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  cors(),
  cookieParser(),
  logger('dev')
]);



function sendSMS(number, message) {
  return new Promise((resolve, reject) => {
    const client = new twilioLibrary.Twilio(accountSid, authToken);
    client.messages.create({
        body: message,
        to:  number,
        from: SMS_FROM  // From a valid Twilio number
    }, function(err, message) {
        if (err) {
          reject(err);
        }
        resolve(message.sid);
    });
  });
}



app.post('/contact', async (req, res) => {
  const { phone, name, comment, gender } = req.body;
  const message = `From: ${name} @ ${phone}, requested gender: ${gender}, notes: ${comment}`;
  try {
    new Contact({ name, phone, comment, gender }).save(); // saving in db
    if (gender == 'female') {
      const smsId = await sendSMS(FEMALE , message);
      console.log('message sent');
    } else {
      const smsId = await sendSMS(MALE , message);
      console.log('message sent');
    }
    console.log(req.body);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }

});

app.get('/', (req, res) => {
  res.json({ working: true });
});

// Listen
app.listen(app.get('port'), (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`🌎 Client is running at http://localhost:5000`);
});
