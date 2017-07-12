import React from 'react';
import { Text, ScrollView, View, TextInput, Button, Image } from 'react-native';
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import request from 'superagent';
import Spinner from 'react-md-spinner';
import Logo from '../../assets/images/logo.png'


import { Card, Loader, Title } from '../../components';

import { styles, colorStyles, sizeStyles, weightStyles } from '../../theme/style'
import { api, json } from '../../api';

injectTapEventPlugin();

class Dashboard extends React.Component {
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
		console.log(this.state);
		api.get('/logs').then((res) => {
			console.log (res);
			if (res.ok)
				this.setState({logs: res.data});
		});
	}
	
	handleChangeGender(event, index, value) {
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
			console.log (res);
			this.setState({ loading: false });
		});
  }
	
	componentDidMount() {
		this.getLogs();
	}
	
	render () {
		return (
			<ScrollView>
				<Text style={[{textAlign: 'center', marginTop: 30, marginBottom: 10}, sizeStyles['large'], colorStyles['gray'], weightStyles['bold']]}>Welcome Dashboard</Text>
				<MuiThemeProvider>
				<View style={[{padding: 20}]}> 
					<View>
						<Text style={[sizeStyles['medium'], colorStyles['gray'], weightStyles['bold']]}>User Activities</Text>
						{
						this.state.logs.map((log) => (
							<Card key={log.id}> 
								<Text>
									<Text style={{width: '20%'}}>{log.action}</Text> | 
									<Text style={{width: '30%'}}>{log.action_key}</Text> |
									<Text style={{width: '50%'}}>{log.action_data}</Text> | 
									<Text style={{width: '50%'}}>{log.created_at}</Text> | 
								</Text>
							</Card>
						))
						}
					</View>
					<View>
						<Text style={[{marginTop: 50},sizeStyles['medium'], colorStyles['gray'], weightStyles['bold']]}>Twilio Form (Send Message)</Text>
						<SelectField
							style={{ padding: 10, width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
							floatingLabelText="preferred gender of masseuse:"
							value={this.state.gender}
							onChange={this.handleChangeGender}
						>
							<MenuItem value="male" primaryText="Massuer (Male)" />
							<MenuItem value="female" primaryText="Masseuse (Female)" />
							<MenuItem value="couple" primaryText="Other" />
						</SelectField><br/>


						<TextInput
							accessibilityLabel='Additional Notes'
							onChange={(event) => this.setState({comment: event.target.value})}
							maxNumberOfLines={3}
							multiline
							numberOfLines={3}
							style={{ padding: 10 }}
							placeholder={`Comments`}
						/> <br/>

						<Button
							accessibilityLabel="Find Local RMT Now"
							color="#2196F3"
							onPress={() => this.sendRequest()}
							title="Find Local RMT Now"
						/>
						{this.state.loading && <Spinner style={{marginTop: 20, marginLeft: 'auto', marginRight: 'auto'}} size={30}/>}
					</View>
				</View>
				</MuiThemeProvider>
			</ScrollView>
		);
	}
}

export default Dashboard;