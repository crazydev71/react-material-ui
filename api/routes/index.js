import express from 'express';

import * as UserController from '../controllers/user.controller';
import * as LogController from '../controllers/log.controller';
import * as RequestController from '../controllers/request.controller';

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

router.route('/request')
  .post(RequestController.sendRequest)
  .put(RequestController.updateRequest);

router.route('/requests')
  .get(RequestController.getAllRequests);

router.route('/profile')
	.post(UserController.updateProfile);

export default router;