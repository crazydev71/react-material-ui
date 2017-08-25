import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { ToasterActions } from '../../components/Toaster';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import Paper from 'material-ui/Paper';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import FaceIcon from 'material-ui-icons/Face';
import TagFacesIcon from 'material-ui-icons/TagFaces';
import Typography from 'material-ui/Typography';
import Card from 'material-ui/Card';

import Schedule from '../../components/Schedule';
import TwilioForm from '../../components/Twilio';

import Logo from '../../assets/images/logo.png';
import { api, json } from '../../api';
import moment from 'moment';

const formatTime = (time, timeSlot) => {
	let min = time.minutes();
	min = Math.floor(min / timeSlot) * timeSlot;
	time.set('minute', min).set('second', 0).set('millisecond', 0);
	return time;
}

class Available extends React.Component {
	render () {
		const {availables, userId, onClick} = this.props;
		const filtered = availables.filter((data) => {return (data.user_id===userId && data.status==='available' && moment().format()<moment(data.start).format())});
		return (
			<Grid 
				container
				direction="column" 
				align="stretch"
				justify="center"
				style={{padding: "5px 0px"}}
			>
			{
				filtered.map((available) => {
					const date = moment(available.start).format("MMM Do, dddd");
					const startTime = moment(available.start).format("h:mm A");
					const endTime = moment(available.end).format("h:mm A");
					return (
						<Button 
							key={available.id} 
							onClick={() => onClick(available)} 
							style={{padding: 10, margin:5, textTransform:'none'}} 
							raised
						>
							{date}&nbsp;&nbsp;&nbsp;{startTime} ~ {endTime}
						</Button>	
					)
				})
			}
			</Grid>
		);
	}
}

function TabContainer(props) {
  return (
    <div style={{ padding: 10, minHeight: 350 }}>
      {props.children}
    </div>
  );
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
		marginTop: 20
	},

	button: {
		width: 200,
		marginBottom: 20
	},
	dialogContent: {
		width: 300
	},
	logo: {
		maxHeight: 70,
		marginBottom: 20
	}
});

class Request extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			availables: [],
			value: 0,
			fOpen: false,

			gender: 'male',
			comment: '',
			booking: {}
		}
		this.sendRequest = this.sendRequest.bind(this);
	}
	
	
	handleChange = (event, value) => {
    this.setState({
			value,
			gender: (value === 0 ? 'male' : 'female')
		});
  };

  handleChangeIndex = index => {
		this.setState({
			value: index,
			gender: (index === 0 ? 'male' : 'female' )
		});
  };
	
	sendRequest() {
		const postData = {
			gender: this.state.gender,
			comment: this.state.comment,
			request_time: this.state.booking.start,
			booking_id: this.state.booking.id,
			handler_id: this.state.booking.user_id
		};
		
		api.post('/request', json(postData)).then((res) => {
			console.log(res.data);
			if (res.ok) {
				this.props.dispatch(ToasterActions.showToaster("Mendr will contact you soon.", 'success', 3000));

				const booking = res.data;
				const availables = this.state.availables.slice();
				const index = availables.findIndex((ele) => {return ele.id===booking.id});
				if (index > 0) {
					availables.splice(index, 1);
					this.setState({availables: availables});
				}
					
				
			} else {
				this.props.dispatch(ToasterActions.showToaster("Whoops, something went wrong!", 'failed', 3000));
			}
		});

		this.setState({fOpen: false});
	}
	
	componentDidMount() {
		api.get('/booking/available')
		.then ((res) => {
			if (!res.ok)
				return;
			this.setState({availables: res.data});
		})
	}

	onClickAvailable = (data) => {
		this.setState({booking: data, fOpen: true, comment: ''});
	}

	render () {
		const classes = this.props.classes;
		return (
				<div style={{padding: 8}}>
					<Typography type="title" align="center" style={{margin:"20px 0px"}}>Mendr Booking Form</Typography>
					<Paper>
						<AppBar position="static" color="default">
							<Tabs
								value={this.state.value}
								onChange={this.handleChange}
								indicatorColor="accent"
								textColor="accent"
								fullWidth
							>
								<Tab label="Male" icon={<TagFacesIcon/>}/>
								<Tab label="Female" icon={<FaceIcon/>}/>
							</Tabs>
						</AppBar>
						<SwipeableViews index={this.state.value} onChangeIndex={this.handleChangeIndex}>
							<TabContainer>
								<Available userId={3} availables={this.state.availables} onClick={this.onClickAvailable.bind(this)}/>
							</TabContainer>
							<TabContainer>
								<Available userId={5} availables={this.state.availables} onClick={this.onClickAvailable.bind(this)}/>
							</TabContainer>
						</SwipeableViews>
					</Paper>

					<Dialog 
						open={this.state.fOpen}
						onRequestClose={() => this.setState({fOpen: false})}
						transition={<Slide direction="down"/>}
						className={classes.dialog}
						classes={{paper: classes.paper}}
					>
						<DialogTitle>
							Send Request
						</DialogTitle>
						<DialogContent className={classes.dialogContent}>
							<Typography type="body2">Time: {moment(this.state.booking.start).format("lll")}</Typography>
							<Typography type="body2">Gender: {this.state.gender}</Typography>
							<TextField
								value={this.state.comment}
								onChange={(event) => this.setState({comment: event.target.value})}
								label="Comment"
								multiline
								rows="4"
								defaultValue="Comment"
								margin="normal"
								fullWidth
							/>
						</DialogContent>
						<DialogActions>
							<Button color="accent" onClick={()=>this.setState({fOpen: false})}>Cancel</Button>
							<Button color="primary" onClick={()=>this.sendRequest()}>Send</Button>
						</DialogActions>
					</Dialog>
			</div>
		);
	}
}

const mapStateToProps = state => ({user: state.user, bookings: state.bookings});
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps) (withStyles(styleSheet)(Request));