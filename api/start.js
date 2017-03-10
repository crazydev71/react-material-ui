import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import requireDir from 'require-dir';
import cors from 'cors';
import logger from 'morgan';
import { ValidationError } from 'property-validator';
import twilioLibrary from 'twilio';
import DB from './db';

const Contact = DB.Model.extend({ tableName: 'contact' });
const accountSid = 'AC5d010cbfe6a1f85818c7b853b546f9c7';
const authToken = '17babb405152040a47a6ae417e439e27';

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
        from: '+16475608663'  // From a valid Twilio number
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
  const message = `Name: ${name}, Person: ${gender}, Message: ${comment}`;
  try {
    new Contact({ ...req.body }).save(); // saving in db
    const smsId = await sendSMS(phone ? phone: '+16475608663' , message);
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
