import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import requireDir from 'require-dir';
import cors from 'cors';
import logger from 'morgan';
import { ValidationError } from 'property-validator';

import DB from './config/db';
import { authenticate, authError, setUser } from './middlewares/auth';
import { sendSMS } from './utils';
import router from './routes';

import Contact from './models/contact';

const app = express();
app.set('port', 5000);

app.use([
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  cors(),
  cookieParser(),
  logger('dev')
]);

app.use('/api', [authenticate.unless({ path:['/api/login', '/api/register', '/api/users'] }), authError, setUser]);

app.use('/api', router);

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

// app.post('/contact', async (req, res) => {
//   const { phone, name, comment, gender } = req.body;
//   const message = `From: ${name} @ ${phone}, requested gender: ${gender}, notes: ${comment}`;
//   try {
//     new Contact({ name, phone, comment, gender }).save(); // saving in db
//     if (gender == 'female') {
//       const smsId = await sendSMS(FEMALE , message);
//       console.log('message sent');
//     } else {
//       const smsId = await sendSMS(MALE , message);
//       console.log('message sent');
//     }
//     console.log(req.body);
//     res.json({ success: true });
//   } catch (err) {
//     console.log(err);
//     res.json({ success: false, error: err });
//   }
// });


// function getAllContacts() {
//   return new Promise((resolve, reject) => {
//     Contact.fetchAll().then((data, err) => {
//       resolve(data.toJSON());
//       if (err) {
//         reject(err);
//       }
//     });
//   });
// }

// app.get('/export', async (req, res) => {
//   const data = await getAllContacts();
//   res.json(data);
// });


