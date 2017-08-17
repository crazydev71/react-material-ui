import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';

import { Calendar, addBookingAction } from 'react-pro-booking-calendar';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-pro-booking-calendar/dist/react-pro-booking-calendar.css';

import TwilioForm from '../Twilio';

const timeSlot = 60;

// Simulate exinsting booking in paris
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

const bookings = [
  {
    startDate: localDatTime.clone().seconds(0).milliseconds(0).hours(10).minutes(0),
    endDate: localDatTime.clone().seconds(0).milliseconds(0).hours(10).minutes(60)
  },
  {
    startDate: localDatTime.clone().seconds(0).milliseconds(0).hours(12).minutes(0),
    endDate: localDatTime.clone().seconds(0).milliseconds(0).hours(13).minutes(60)
  }
];

class Booking extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.booking;
    console.log(props.booking);
  }

  handleSubmit(data) {
    const { dispatch } = this.props;
    const bookingData = {
      ...this.state,
      ...data,
    };
    console.log(bookingData);
    dispatch(addBookingAction(bookingData));
    this.props.onSubmit(bookingData);
    this.props.onClose();
  }

  render() {
    return (
      <TwilioForm onSubmit={this.handleSubmit.bind(this)} onCancel={() => this.props.onClose()}/>
    );
  }
}

Booking = connect()(Booking);

const styleSheet = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  container: {
    margin: "0px",
    overflow: "scroll",
    minHeight: "100%"
  }
});

class Schedule extends React.Component {
  render() {
    const { classes, onRequestClose, onSubmit } = this.props;
    return (
      <div className={classes.container}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography 
              type="title" 
              color="inherit" 
              className={classes.flex}
            >
              Schedule
            </Typography>
            <IconButton 
              color="contrast" 
              onClick={onRequestClose} 
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Calendar bookings={this.props.bookings}
          timeSlot={timeSlot}
          timeExceptions={timeExceptions}
          canViewBooking={false}
        >
          <Booking onSubmit={onSubmit}/>
        </Calendar>
      </div>
    );
  }
}

export default connect()(withStyles(styleSheet)(Schedule));