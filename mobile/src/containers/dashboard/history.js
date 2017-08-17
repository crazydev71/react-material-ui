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
			gender: 'male',
			comment: '',
			loading: false
		}
		this.getLogs = this.getLogs.bind(this);
		this.handleChangeGender = this.handleChangeGender.bind(this);
	}
	
	getLogs () {
		api.get('/logs').then((res) => {
			if (res.ok)
				this.setState({logs: res.data});
		});
	}
	
	handleChangeGender(event, value) {
		this.setState({
		gender: value
		});
	}
	
	componentDidMount() {
		this.getLogs();
	}

	componentWillReceiveProps (newProps) {
	}

	render () {
		return (
			<ScrollView>
				<View style={[{padding: 10}]}> 
					<Text style={[sizeStyles['medium'], colorStyles['gray'], weightStyles['bold']]}>User Activities [{this.props.user.role}]</Text>
					<HistoryTable dataSet={this.state.logs}/>
					{/* <Button raised color="primary">
						Primary
					</Button> */}
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.user
	}
}

const dispatchToProps = (dispatch) => ({
	dispatch,
})
export default connect(mapStateToProps, dispatchToProps) (History);