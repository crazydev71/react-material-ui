import user from './user';
import loader from './loader';
import toaster from './toaster';
import calendarReducer from '../components/Calendar/src/reducers/calendarReducer';
import bookingReducer from '../components/Calendar/src/reducers/bookingReducer';

export default {
	user,
	loader,
	toaster,
	calendar: calendarReducer,
	booking: bookingReducer
}
