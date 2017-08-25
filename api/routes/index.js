import express from 'express';

import * as UserController from '../controllers/user.controller';
import * as LogController from '../controllers/log.controller';
import * as RequestController from '../controllers/request.controller';
import * as CalendarController from '../controllers/calendar.controller';
import * as BookingController from '../controllers/booking.controller';

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
  .get(RequestController.getAllRequests)
  .post(RequestController.getAllBookings);

router.route('/profile')
	.post(UserController.updateProfile);

router.route('/calendar/freebusy')
	.post(CalendarController.checkFreeBusy);

router.route('/calendar')
	.get(CalendarController.getEventsList);

router.route('/booking')
	.get(BookingController.getAll);

router.route('/booking/available')
	.get(BookingController.getAvailable)
	.post(BookingController.addAvailable)
	.delete(BookingController.deleteAvailable);

router.route('/booking/booking')
	.get(BookingController.getBooked)
	.post(BookingController.setBooked);

export default router;