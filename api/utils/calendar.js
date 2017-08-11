import CONFIG from '../config/Settings';
import CalendarAPI from 'node-google-calendar';
let cal = new CalendarAPI(CONFIG);
const calendarIdList = CONFIG.calendarId;

const listAllEventsInCalendar = (calendarId) => {
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
		console.log(eventsArray);
	}).catch(err => {
		console.log('Error: listAllEventsInCalendar -' + err);
	});
}

const listSingleEventsWithinDateRange = (calendarId, startDateTime, endDateTime, query) => {
	let eventsArray = [];
	let params = {
		timeMin: startDateTime,
		timeMax: endDateTime,
		q: query,
		singleEvents: true,
		orderBy: 'startTime'
	}

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

			console.log('List of events on calendar within time-range:');
			console.log(eventsArray);

		}).catch(err => {
			console.log('Error: listSingleEventsWithinDateRange -' + err);
		});
}

const listRecurringEventsWithinDateRange = (calendarId, startDateTime, endDateTime, query) => {
	let eventsArray = [];
	let params = {
		timeMin: startDateTime,
		timeMax: endDateTime,
		q: query,
		singleEvents: false
	}

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

			console.log('List of recurring events on calendar within time-range:');
			console.log(eventsArray);

		}).catch(err => {
			console.log('Error: listRecurringEventsWithinDateRange -' + err);
		});
}

const quickAddEvent = (calendarId, text) => {
	let params = {
		'text': text
	}

	cal.Events.quickAdd(calendarId, params)
		.then(resp => {
			let json = resp;
			console.log('inserted quickAddEvent:');
			console.log(json);
		})
		.catch(err => {
			console.log('Error: quickAddEvent-' + err);
		});
}

const insertEvent = (calendarId, eventSummary, startDateTime, endDateTime, location, status, description) => {
	let event = {
		'start': {
			'dateTime': startDateTime
		},
		'end': {
			'dateTime': endDateTime
		},
		'location': location,
		'summary': eventSummary,
		'status': status,
		'description': description,
		'colorId': 1
	};

	cal.Events.insert(calendarId, event)
		.then(resp => {
			let json = resp;
			let results = {
				id: json.id,
				'summary': json.summary,
				'location': json.location,
				'status': json.status,
				'start': json.start.dateTime,
				'end': json.end.dateTime,
				'created': new Date(json.created)
			};
			console.log('inserted event:');
			console.log(results);
		})
		.catch(err => {
			console.log('Error: insertEvent-' + err);
		});
}

const insertRecurringEvent = (calendarId, eventSummary, startDateTime, endDateTime, location, status, description, recurrenceRule) => {
	let event = {
		'start': {
			'dateTime': startDateTime,
			'timeZone': 'Asia/Singapore'
		},
		'end': {
			'dateTime': endDateTime,
			'timeZone': 'Asia/Singapore'
		},
		'location': location,
		'summary': eventSummary,
		'status': status,
		'description': description,
		'colorId': 1,
		'recurrence': recurrenceRule
	};

	cal.Events.insert(calendarId, event)
		.then(resp => {
			let json = resp;
			console.log('inserted event:');
			console.log(json);
		})
		.catch(err => {
			console.log('Error: insertRecurringEvent-' + err);
		});
}

const deleteEvent = (calendarId, eventId) => {
	let params = {
		sendNotifications: true
	};
	return cal.Events.delete(calendarId, eventId, params)
		.then(resp => {
			console.log('Deleted Event Response: ');
			console.log(resp);
		})
		.catch(err => {
			console.log('Error: deleteEvent-' + err);
		});
}

const getEvent = (calendarId, eventId) => {
	let params = {};

	return cal.Events.get(calendarId, eventId, params)
		.then(resp => {
			console.log('GetEvent: ' + eventId);
			console.log(resp);
		})
		.catch(err => {
			console.log('Error: getEvent-' + err);
		});
}

const updateEvent = (calendarId, eventId, eventSummary, startDateTime, endDateTime, location, status, description, recurrenceRule) => {
	let event = {
		'start': {
			'dateTime': startDateTime,
			'timeZone': 'Asia/Singapore'
		},
		'end': {
			'dateTime': endDateTime,
			'timeZone': 'Asia/Singapore'
		},
		'location': location,
		'summary': eventSummary,
		'status': status,
		'description': description,
		'colorId': 1,
		'recurrence': recurrenceRule
	};

	cal.Events.update(calendarId, eventId, event)
		.then(resp => {
			let json = resp;
			console.log('updated event:');
			console.log(json);
		})
		.catch(err => {
			console.log('Error: updatedEvent-' + err);
		});
}

const eventInstances = (calendarId, eventId) => {
	let params = {};

	return cal.Events.instances(calendarId, eventId, params)
		.then(resp => {
			console.log('eventInstances: ' + eventId);
			console.log(resp);
		})
		.catch(err => {
			console.log('Error: eventInstances-' + err);
		});
}

const moveEvent = (calendarId, eventId, destination) => {
	let params = { 'destination': destination };

	return cal.Events.move(calendarId, eventId, params)
		.then(resp => {
			console.log('moveEvent: ' + eventId);
			console.log(resp);
		})
		.catch(err => {
			console.log('Error: moveEvent-' + err);
		});
}

const checkBusy = (calendarId, startDateTime, endDateTime) => {
	let params = {
		"timeMin": startDateTime,
		"timeMax": endDateTime,
		"items": [{ "id": calendarId }]
	};

	return cal.FreeBusy.query(calendarId, params)
		.then(resp => {
			console.log('List of busy timings with events on calendar within defined time range: ' + startDateTime + ' - ' + endDateTime);
			console.log(resp);
		})
		.catch(err => {
			console.log('Error: checkBusy -' + err);
		});
}

const getSettings = (settingId) => {
	return cal.Settings.get(settingId)
		.then(resp => {
			console.log('List settings with settingID: ' + settingId);
			console.log(resp);
		})
		.catch(err => {
			console.log('Error: getSettings -' + err);
		});
}

const listSettings = () => {
	let params = {};
	return cal.Settings.list(params)
		.then(resp => {
			console.log('List settings: ');
			console.log(resp);
		})
		.catch(err => {
			console.log('Error: listSettings -' + err);
		});
}