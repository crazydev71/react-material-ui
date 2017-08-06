import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'react-router';
import { Text, ScrollView, View, TextInput, Button, Image } from 'react-native';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormGroup } from 'material-ui/Form';
import { ToastActionsCreators } from 'react-native-redux-toast';
import MaterialDateTimePicker from 'material-datetime-picker/dist/material-datetime-picker.js';
import 'material-datetime-picker/dist/material-datetime-picker.css';
import '../../assets/styles/datetimepicker.css';
import TextField from 'material-ui/TextField';
import Spinner from 'react-md-spinner';
import Logo from '../../assets/images/logo.png';
import { Card } from '../../components';
import { styles, colorStyles, sizeStyles, weightStyles } from '../../theme/style'
import Checkbox from 'material-ui/Checkbox';
import { api, json } from '../../api';
import moment from 'moment';

class DateTimePicker extends React.Component {
	componentDidMount() {
		this.picker = new MaterialDateTimePicker()
			.on('submit', this.props.onSubmit)
			.on('open', this.props.onOpen)
			.on('close', this.props.onClose);

		if (this.props.open == true)
    	this.picker.open({default: Date.now()});
	}
  render() {
    return (
      <div></div>
    )
  }
}

DateTimePicker.propType = {
    onOpen: PropTypes.func,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func
}

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
		}
		this.sendRequest = this.sendRequest.bind(this);
		this.handleChangeGender = this.handleChangeGender.bind(this);
		this.onSetTime = this.onSetTime.bind(this);
	}
	
	handleChangeGender(event, value) {
    this.setState({
      gender: value
    });
  }
	
	sendRequest(event) {
    this.setState({ loading: true });
		const postData = {
			gender: this.state.gender,
			comment: this.state.comment,
			request_time: this.state.fReserveTime ? this.state.time.format() : null
		};
		
		api.post('/request', json(postData)).then((res) => {
			this.setState({ loading: false });
			if (res.ok)
				this.props.dispatch(ToastActionsCreators.displayInfo("Mendr will contact you soon. Thanks", 3000));
			else
				this.props.dispatch(ToastActionsCreators.displayInfo("Whoops, something went wrong!", 3000));
		});
	}
	
	onSetTime (value) {
		this.setState({time: value})
	}
	
	componentDidMount() {
		if (this.props.user.role != 'client')
			this.dispatch(push('/dashboard/client-requests'))
	}
	render () {
		return (
			<ScrollView>
				<View style={[{padding: 10}]}> 
					<Image
						resizeMode={Image.resizeMode.contain}
						source={{ uri: Logo }}
						style={[styles.image, {marginTop: 50}]}
					/>
					<Text style={[{marginTop: 50},sizeStyles['medium'], colorStyles['gray'], weightStyles['bold']]}>Twilio Form (Send Message)</Text>
					
					<RadioGroup
						aria-label="Gender"
						name="gender"
						selectedValue={this.state.gender}
						onChange={this.handleChangeGender}
						row
					>
						<FormControlLabel value="male" control={<Radio />} label="Male" />
						<FormControlLabel value="female" control={<Radio />} label="Female" />
						<FormControlLabel value="other" control={<Radio />} label="Other" />
					</RadioGroup> 
					<br/>

					<TextInput
						accessibilityLabel='Additional Notes'
						onChange={(event) => this.setState({comment: event.target.value})}
						maxNumberOfLines={3}
						multiline
						numberOfLines={3}
						style={{ padding: 10, borderStyle: 'solid', borderWidth: 1 }}
						placeholder={`Comments`}
					/> <br/>

					<Button
						accessibilityLabel="Find Local RMT Now"
						color="#2196F3"
						onPress={() => this.sendRequest()}
						title="Find Local RMT Now"
					/>
					<FormGroup>
						<FormControlLabel
							control={<Checkbox checked={this.state.fReserveTime} onChange={(event, value) => this.setState({fReserveTime: value, fOpen: value})} />}
							label="Reserve Time"
						/>
						{this.state.fReserveTime && 
							<TextField
								error
								color="accent"
								label="Reserved Time"
								value={this.state.time.format('h:mm A,  MMMM Do, YYYY')}
								margin="normal"
								onFocus={()=>this.setState({fOpen: true})}
							/>
						}
					</FormGroup>
					{this.state.fOpen && (
						<DateTimePicker open={this.state.fReserveTime} onSubmit={this.onSetTime} onOpen={()=>{}} onClose={()=>{this.setState({fOpen: false})}}/>
					)
					}
			</View>
		</ScrollView>
		);
	}
}

const mapStateToProps = state => ({user: state.user});
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps) (Request);