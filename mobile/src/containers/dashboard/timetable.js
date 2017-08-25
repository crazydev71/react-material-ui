import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { addBookingAction, deleteBookingAction } from '../../components/Calendar';
import moment from 'moment';

import Schedule from '../../components/Schedule';
import { api, json } from '../../api';

const format = (bookingData) => {
	const temp = Object.assign({}, bookingData);
	temp.startDate = moment(temp.start);
	temp.endDate = moment(temp.end);
	delete temp['start'];
	delete temp['end'];
	return temp;
};

class TimeTable extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			bookings: []
		}
		this.onDayClick = this.onDayClick.bind(this);
	}
	
	componentDidMount() {
		api.get('/booking').then((res) => {
			console.log(res);
			if (res.ok) {
				res.data.forEach((data) => {
					this.props.dispatch(addBookingAction(format(data)));
				});
			}
		});
	}

	onDayClick (booking) {
		console.log(booking);
		if (!booking.isBooked) {
			api.post('/booking/available', json({start: booking.startDate.format(), end: booking.endDate.format()}))
			.then((res) => {
				console.log(res);
				if (res.ok) {
					const booking = format(res.data);
					this.props.dispatch(addBookingAction(booking));
				}
			})
		} else if(booking.id) {
			api.delete(`/booking/available?id=${booking.id}`)
			.then((res) => {
				if (res.ok) {
					this.props.dispatch(deleteBookingAction(booking));
				}
			})
		}
	}

	render () {
		return (
			<div style={{padding: 10}}> 
				<Typography type="headline">Set Available Times</Typography>
				<Schedule
					bookings={this.state.bookings}
					onDayClick={this.onDayClick}
				/>
			</div>
		);
	}
}

const stateToProps = (state) => ({
	booking: state.booking
});

export default connect(stateToProps) (TimeTable);