import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { ToastActionsCreators } from 'react-native-redux-toast';

import Spinner from 'react-md-spinner';
import Logo from '../../assets/images/logo.png';
import { Card } from '../../components';
import { UsersTable } from '../../components';
import { styles, colorStyles, sizeStyles, weightStyles } from '../../theme/style'

import { api, json } from '../../api';
// import { withStyles, createStyleSheet } from 'material-ui/styles';
// import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

class ClientRequests extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			users: []
		}
		this.getUsers = this.getUsers.bind(this);
		this.handleChangeGender = this.handleChangeGender.bind(this);
	}
	
	getUsers () {
		api.get('/users').then((res) => {
			if (res.ok)
				this.setState({users: res.data});
		});
	}
	
	handleChangeGender(event, value) {
		this.setState({
			gender: value
		});
	}
	
	componentDidMount() {
		this.getUsers();
	}

	componentWillReceiveProps (newProps) {
	}

	render () {
		return (
			<ScrollView>
				<View style={[{padding: 20}]}> 
					<Text style={[sizeStyles['medium'], colorStyles['gray'], weightStyles['bold']]}>Manage Mendr Users</Text>
					<br/>
					<Paper>
						<Table>
							<TableHead>
								<TableRow>
									{/* <TableCell numeric>No</TableCell> */}
									<TableCell numeric>Id</TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Role</TableCell>
									{/* <TableCell>Edit</TableCell> */}
								</TableRow>
							</TableHead>
							<TableBody>
							{
								this.state.users.map((n, index) => {
									return (
									<TableRow key={n.id}>
										{/* <TableCell numeric> {index + 1} </TableCell> */}
										<TableCell numeric> {n.id} </TableCell>
										<TableCell > {n.name} </TableCell>
										<TableCell > {n.role} </TableCell>
										{/* <TableCell >  </TableCell> */}
									</TableRow>
									);
								})
							}
							</TableBody>
						</Table>
					</Paper>
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps) (ClientRequests);