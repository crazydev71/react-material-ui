import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

import Schedule from '../../components/Schedule';

import { api, json } from '../../api';


class TimeTable extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			bookings: []
		}
	}
	
	componentDidMount() {
	}

	render () {
		return (
			<div style={{padding: 10}}> 
				<Typography type="headline">Set Available Times</Typography>
					<Schedule
						bookings={this.state.bookings}
					/>
			</div>
		);
	}
}

export default connect() (TimeTable);