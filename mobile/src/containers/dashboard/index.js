import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '../../components';

import { styles, colorStyles, sizeStyles, weightStyles } from '../../theme/style'
import { api } from '../../api';

class Dashboard extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			logs: []
		}
		this.getLogs = this.getLogs.bind(this);
	}
	
	getLogs () {
		api.get('/logs').then((res) => {
			console.log (res);
			if (res.ok)
				this.setState({logs: res.data});
		});
	}
	
	componentDidMount() {
		this.getLogs();
	}
	
	render () {
		return (
			<ScrollView>
				<Text style={[{textAlign: 'center', marginTop: 50, marginBottom: 50}, sizeStyles['large'], colorStyles['gray'], weightStyles['bold']]}>Welcome Dashboard</Text>
				
				<View style={[{padding: 20}]}> 
					<Text style={[sizeStyles['medium'], colorStyles['gray'], weightStyles['bold']]}>Major Activities</Text>
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
			</ScrollView>
		);
	}
}

export default Dashboard;