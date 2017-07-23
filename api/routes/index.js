import express from 'express';

import * as UserController from '../controllers/user.controller';
import * as LogController from '../controllers/log.controller';
import * as ContactController from '../controllers/contact.controller';

const router = express.Router();

router.route('/auth')
  .post(UserController.auth)

router.route('/login')
  .post(UserController.login);

router.route('/register')
  .post(UserController.register);

router.route('/requestsmscode')
  .post(UserController.requestSMSCode);

router.route('/verifysmscode')
  .post(UserController.verifySMSCode);

router.route('/logs')
  .get(LogController.getLogs);

router.route('/users')
  .get(UserController.getUsers);

router.route('/contact')
  .post(ContactController.sendContact);

router.route('/contacts')
  .get(ContactController.getAllContacts);

export default router;