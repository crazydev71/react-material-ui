import twilioLibrary from 'twilio';
import Promise from 'promise';

const { TWILIO_SID, TWILIO_SECRET, SMS_FROM } = process.env;

const sendSMS = (number, message) => {
  return new Promise((resolve, reject) => {
    
    const client = new twilioLibrary.Twilio(TWILIO_SID, TWILIO_SECRET);
    
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

export default sendSMS;