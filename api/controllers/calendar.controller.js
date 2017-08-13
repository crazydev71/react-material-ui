import CONFIG from '../config/calendar-settings';
import CalendarAPI from 'node-google-calendar';
import moment from 'moment';

const cal = new CalendarAPI(CONFIG);
const calendarId = CONFIG.calendarId['mendr-calendar'];

export const checkFreeBusy = (req, res) => {
	const {time} = req.body;

	// 1 hour time slot 
	let timeMin = moment(time);
	let timeMax = timeMin.clone().add(1, 'hour');

	console.log(timeMin.format());
	console.log(timeMax.format());

	let params = {
		"timeMin": timeMin.format(),
		"timeMax": timeMax.format(),
		"items": [{ "id": calendarId }]
	};

	cal.FreeBusy.query(calendarId, params)
  .then(resp => {
  	console.log('List of busy timings with events within defined time range: ');
    console.log(resp);
  	return res.json(resp);
  })
  .catch(err => {
		console.log('Error: checkBusy -' + err);
  });
}

export const getEventsList = (req, res) => {

	let eventsArray = [];
	let params = {};
	cal.Events.list(calendarId, params)
	.then(json => {
		for (let i = 0; i < json.length; i++) {
			let event = {
				id: json[i].id,
				summary: json[i].summary,
				location: json[i].location,
				start: json[i].start,
				end: json[i].end,
				status: json[i].status
			};
			eventsArray.push(event);
		}
		console.log('List of all events on calendar');
		console.log(json);
		res.json(json);
	}).catch(err => {
		console.log('Error: listAllEventsInCalendar -' + err);
	});
}