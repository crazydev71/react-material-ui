import React from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, View, TextInput, Button } from 'react-native';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import { ToastActionsCreators } from 'react-native-redux-toast';

import Spinner from 'react-md-spinner';
import Logo from '../../assets/images/logo.png';
import { Card } from '../../components';
import { HistoryTable } from '../../components';
import { styles, colorStyles, sizeStyles, weightStyles } from '../../theme/style'

import { api, json } from '../../api';

class History extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			logs: [],
			gender: 'male',
			comment: '',
			loading: false
		}
		this.sendRequest = this.sendRequest.bind(this);
		this.getLogs = this.getLogs.bind(this);
		this.handleChangeGender = this.handleChangeGender.bind(this);
	}
	
	getLogs () {
		api.get('/logs').then((res) => {
			console.log (res);
			if (res.ok)
				this.setState({logs: res.data});
		});
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
		};
		
		api.post('/contact', json(postData)).then((res) => {
			this.setState({ loading: false });
			if (res.ok)
				this.props.dispatch(ToastActionsCreators.displayInfo("Mendr will contact you soon. Thanks", 3000));
			else
				this.props.dispatch(ToastActionsCreators.displayInfo("Whoops, something went wrong!", 3000));
		});
  }
	
	componentDidMount() {
		this.getLogs();
		console.log(this.props);
	}
	render () {
		return (
			<ScrollView>
				<View style={[{padding: 20}]}> 
					<Text style={[sizeStyles['medium'], colorStyles['gray'], weightStyles['bold']]}>User Activities</Text>
					<HistoryTable dataSet={this.state.logs}/>
				</View>
			</ScrollView>
		);
	}
}

export default connect() (History);