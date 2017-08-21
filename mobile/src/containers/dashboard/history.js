import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { ToastActionsCreators } from 'react-native-redux-toast';

import Spinner from 'react-md-spinner';
import Logo from '../../assets/images/logo.png';
import { Card } from '../../components';
import { HistoryTable } from '../../components';
import { styles, colorStyles, sizeStyles, weightStyles } from '../../theme/style'

import { api, json } from '../../api';
// import { withStyles } from 'material-ui/styles';
// import Button from 'material-ui/Button';

class History extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			logs: [],
		}
		this.getLogs = this.getLogs.bind(this);
	}
	
	getLogs () {
		api.get('/logs').then((res) => {
			if (res.ok)
				this.setState({logs: res.data});
		});
	}
	
	componentDidMount() {
		this.getLogs();
	}

	componentWillReceiveProps (newProps) {
	}

	render () {
		return (
			<div style={{padding: 10}}> 
				<Text style={[sizeStyles['medium'], colorStyles['gray'], weightStyles['bold']]}>User Activities [{this.props.user.role}]</Text>
				<HistoryTable dataSet={this.state.logs}/>
			</div>
		);
	}
}

export default connect() (History);