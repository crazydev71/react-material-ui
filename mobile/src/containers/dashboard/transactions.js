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

class Transactions extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			logs: [],
			gender: 'male',
			comment: '',
			loading: false
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
		// this.getLogs();
	}

	componentWillReceiveProps (newProps) {
	}

	render () {
		return (
			<ScrollView>
				<View style={[{padding: 20}]}> 
					<Text style={[sizeStyles['medium'], colorStyles['gray'], weightStyles['bold']]}>Transaction History [{this.props.user.role}]</Text>
                    <Text>Transaction Table Here</Text>
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps) (Transactions);