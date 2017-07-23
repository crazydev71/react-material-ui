import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import requireDir from 'require-dir';
import cors from 'cors';
import logger from 'morgan';
import { ValidationError } from 'property-validator';

import DB from './config/db';
import { authenticate, authError, setUser } from './middlewares/auth';
import router from './routes';

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

