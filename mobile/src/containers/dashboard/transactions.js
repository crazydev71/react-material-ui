import React from 'react';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';

import { api, json } from '../../api';

class Transactions extends React.Component {
	constructor (props) {
		super(props);
	}
	
	componentDidMount() {
	}

	componentWillReceiveProps (newProps) {
	}

	render () {
		return (
			<div style={{padding: 10}}> 
				<Typography 
					type='title' 
				>
					Transaction History
				</Typography>
				<Typography
					type='subheading'
				>
					Transaction Table Here
				</Typography>
			</div>
		);
	}
}


export default connect() (Transactions);