  import CONFIG from '../config/calendar-settings';
  import CalendarAPI from 'node-google-calendar';
  const cal = new CalendarAPI(CONFIG);
  const calendarId = CONFIG.calendarId;

  export const checkFreeBusy = (req, res) => {
  	let params = {
			"timeMin": '2017-05-20T08:00:00+08:00',
			"timeMax": '2017-05-20T09:00:00+08:00',
			"items": [{ "id": calendarId['mendr-calendar'] }]
		};

		cal.FreeBusy.query(calendarId['mendr-calendar'], params)
	  .then(resp => {
	  	console.log('List of busy timings with events within defined time range: ');
      console.log(resp);
	  	return res.json(resp);
	  })
	  .catch(err => {
		console.log('Error: checkBusy -' + err);
	  });
  }