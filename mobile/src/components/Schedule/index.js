import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { withStyles } from 'material-ui/styles';

import { Calendar, addBookingAction } from '../Calendar';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-pro-booking-calendar/dist/react-pro-booking-calendar.css';

const timeSlot = 60;

const localDatTime = moment();

function getTime(hour, minute) {
  return localDatTime.clone().startOf('day').hour(hour).minute(minute).format('HH:mm');
}

const timeSlices = [
  { day: 'Monday', start: getTime(10, 0), end: getTime(18, 0) },
  { day: 'Tuesday', start: getTime(9, 30), end: getTime(16, 0) },
  { day: 'Wednesday', start: getTime(9, 30), end: getTime(17, 0) },
  { day: 'Thursday', start: getTime(10, 30), end: getTime(16, 30) },
  { day: 'Friday', start: getTime(8, 30), end: getTime(17, 30) },
  { day: 'Saturday', start: getTime(10, 30), end: getTime(16, 30) },
  { day: 'Sunday', start: getTime(10, 30), end: getTime(15, 30) }
];

const timeExceptions = [
    {
        startDate: localDatTime.clone().add(3, 'd').format('L'),
        endDate: localDatTime.clone().add(5, 'd').format('L'),
        startTime: getTime(9, 0),
        endTime: getTime(17, 0)
    },
    {
        startDate: localDatTime.clone().add(6, 'd').format('L'),
        endDate: localDatTime.clone().add(7, 'd').format('L'),
        startTime: getTime(11, 0),
        endTime: getTime(14, 0),
        off: true
    }
];

const styleSheet = theme => ({
  
});

class Schedule extends React.Component {

  render() {
    return (
      <Calendar bookings={this.props.bookings}
        timeSlot={timeSlot}
        timeExceptions={timeExceptions}
        canViewBooking={true}
        displayPast={true}
        onDayClick={this.props.onDayClick}
      >
      </Calendar>
    );
  }
}

export default connect()(withStyles(styleSheet)(Schedule));