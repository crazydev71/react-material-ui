import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import { HistoryTable } from '../../components';
import { api, json } from '../../api';


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

	render () {
		return (
			<div style={{padding: 10}}> 
				<Typography type="headline">History Table</Typography>
				<HistoryTable dataSet={this.state.logs}/>
			</div>
		);
	}
}

export default connect() (History);