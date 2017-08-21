import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { ToasterActions } from '../../components/Toaster';
import { addBookingAction } from 'react-pro-booking-calendar';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import { FormLabel, FormControl, FormControlLabel, FormGroup } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Spinner from 'react-md-spinner';
import Paper from 'material-ui/Paper';
import Slide from 'material-ui/transitions/Slide';


// import MaterialDateTimePicker from 'material-datetime-picker/dist/material-datetime-picker.js';
// import 'material-datetime-picker/dist/material-datetime-picker.css';
// import '../../assets/styles/datetimepicker.css';

import Logo from '../../assets/images/logo.png';
import { Card } from '../../components';
import { styles, colorStyles, sizeStyles, weightStyles } from '../../theme/style'
import Checkbox from 'material-ui/Checkbox';
import { api, json } from '../../api';
import moment from 'moment';

import Schedule from '../../components/Schedule';
import TwilioForm from '../../components/Twilio';



// class DateTimePicker extends React.Component {
// 	componentDidMount() {
// 		this.picker = new MaterialDateTimePicker()
// 			.on('submit', this.props.onSubmit)
// 			.on('open', this.props.onOpen)
// 			.on('close', this.props.onClose);

// 		if (this.props.open == true)
//     	this.picker.open({default: Date.now()});
// 	}
//   render() {
//     return (
//       <div></div>
//     )
//   }
// }

// DateTimePicker.propType = {
//     onOpen: PropTypes.func,
//     onSubmit: PropTypes.func,
//     onClose: PropTypes.func
// }

const formatTime = (time, timeSlot) => {
	let min = time.minutes();
	min = Math.floor(min / timeSlot) * timeSlot;
	time.set('minute', min).set('second', 0).set('millisecond', 0);
	return time;
}

const styleSheet = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
	},
	paper: {
		margin: 20
	},
	grid: {
		marginTop: 100
	},

	button: {
		width: 200,
		marginBottom: 20
	},
	dialogContent: {
		padding: 20,
		paddingTop: 0
	},
	logo: {
		maxHeight: 70,
		marginBottom: 70
	}
});

class Request extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			logs: [],
			gender: 'male',
			comment: '',
			loading: false,
			fReserveTime: false,
			fOpen: false,
			time: moment(),
			fSchedule: false,
			fASAP: false,
			bookings: []
		}
		this.sendRequest = this.sendRequest.bind(this);
		this.handleChangeGender = this.handleChangeGender.bind(this);
		this.onSetTime = this.onSetTime.bind(this);
		this.addBooking = this.addBooking.bind(this);
	}
	
	handleChangeGender(event, value) {
    this.setState({
      gender: value
    });
  }
	
	sendRequest(data) {
    this.setState({ loading: true });
		const postData = {
			gender: data.gender,
			comment: data.comment,
			request_time: this.state.fSchedule ? data.startDate.format() : null
		};
		
		api.post('/request', json(postData)).then((res) => {
			console.log(res.data);
			this.setState({ loading: false });
			if (res.ok) {
				this.props.dispatch(ToasterActions.showToaster("Mendr will contact you soon.", 'success', 3000));
				this.addBooking(res.data);
			} else {
				this.props.dispatch(ToasterActions.showToaster("Whoops, something went wrong!", 'failed', 3000));
			}
		});
	}
	
	onSetTime (value) {
		this.setState({time: value});
		api.post('/calendar/freebusy', json({time: this.state.time.format()}))
		.then((res) => {
			console.log(res);
		})
	}
	
	componentDidMount() {
		api.post('/requests')
		.then ((res) => {
			if (!res.ok)
				return;

			const result = res.data
			
			result.forEach((booking) => {
				this.addBooking(booking);
			})
		})
	}

	addBooking = (booking) => {
		let startDate, endDate;
		if (booking.request_time)
				startDate = new moment(booking.request_time);
			else
				startDate = new moment(booking.created_at);

			formatTime(startDate, 60);
			endDate = startDate.clone().add(60, 'minute');
			this.state.bookings = [...this.state.bookings, {startDate, endDate}];
	}

	render () {
		const classes = this.props.classes;
		return (
				<div style={{padding: 8}}> 
					<Grid 
						container 
						className={classes.grid} 
						direction="column" 
						align="center"
						justify="center"
					>
						<img
							src={Logo}
							className={classes.logo}
						/>
						<Button 
							color="accent" 
							raised
							onClick={()=>{this.setState({fASAP: true})}} 
							className={classes.button}
						>
							Find Local RMT ASAP
						</Button>
						<Button
							color="accent" 
							raised
							onClick={()=>{this.setState({fSchedule: true})}} 
							className={classes.button}
						>
							Schedule
						</Button>
					</Grid>
				
				<Dialog 
					fullScreen
					open={this.state.fSchedule}
					onRequestClose={()=> this.setState({ fSchedule: false })}
					transition={<Slide direction="up"/>}
				>
					<Schedule 
						onRequestClose={()=> this.setState({ fSchedule: false })} 
						onSubmit={this.sendRequest}
						bookings={this.state.bookings}
					/>
				</Dialog>
				<Dialog 
					open={this.state.fASAP}
					onRequestClose={() => this.setState({fASAP: false})}
					transition={<Slide direction="down"/>}
					className={classes.dialog}
					classes={{paper: classes.paper}}
				>
					<DialogTitle>
						Send Request
					</DialogTitle>
					<DialogContent className={classes.dialogContent}>
						<TwilioForm 
							onSubmit={(data)=>{ this.sendRequest(data); this.setState({fASAP: false});}} 
							onCancel={()=>{this.setState({fASAP: false});}}
						/>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = state => ({user: state.user, bookings: state.bookings});
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps) (withStyles(styleSheet)(Request));