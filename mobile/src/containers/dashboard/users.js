import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';

import { api, json } from '../../api';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

import UserEdit from './useredit';

const styleSheet = createStyleSheet(theme => ({
  button: {
		width: 30,
		height: 30
	},
	card: {
		backgroundColor: "#29B6F6",
		color: "white"
	},
	cardHeader: {
		color: "white"
	},
	cardContent: {
		color: "white",
		fontWeight: "600"
	},
	paper: {
		backgroundColor: "#FEFEFE",
		overflowX: 'auto',
	}
}));


class Users extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			users: [],
			isEditing: false,
			editingUser: {}
		}
		this.getUsers = this.getUsers.bind(this);
	}
	
	getUsers () {
		api.get('/users').then((res) => {
			if (res.ok)
				this.setState({users: res.data});
		});
	}
	
	componentDidMount() {
		this.getUsers();
	}

	componentWillReceiveProps (newProps) {
	}

	render () {
		const classes = this.props.classes;
		let nAdmins = 0, nClients = 0, nEmployee = 0;
		this.state.users.forEach((user) => {
			if (user.role == 'admin') nAdmins++;
			if (user.role == 'client') nClients++;
			if (user.role == 'employee') nEmployee++;
		})
		return (
			<ScrollView>
				<View style={[{padding: 10}]}> 
					<Card className={classes.card} raised>
						<CardContent>
							<Typography type="headline" className={classes.cardHeader}>Mendr Users</Typography>
							<Typography type="subheading" className={classes.cardContent}>Total: {this.state.users.length}</Typography>
							<Typography type="subheading" className={classes.cardContent}>Admins: {nAdmins}, Employees: {nEmployee}, Clients: {nClients}</Typography>
						</CardContent>
					</Card>
					<br/><br/><br/>
					<Typography type="headline">
						User List (Total {this.state.users.length})
					</Typography>
					<br/>
					<Paper className={classes.paper} elevation={10}>
						<Table>
							<TableHead>
								
								<TableRow>
									<TableCell compact >Name</TableCell>
									<TableCell compact disablePadding>Role</TableCell>
									<TableCell compact>Edit</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
							{
								this.state.users.map((n, index) => (
									<TableRow key={n.id}>
										<TableCell compact> {n.name} </TableCell>
										<TableCell compact disablePadding> {n.role} </TableCell>
										<TableCell compact disablePadding> 
											{ 
												<div>
													<IconButton className={classes.button}>
														<DeleteIcon />
													</IconButton>
													<IconButton color="primary" className={classes.button} onClick={()=>{this.setState({editingUser: n}); this.setState({isEditing: true})}}>
														<ModeEditIcon />
													</IconButton>
												</div>
											}
										</TableCell>
									</TableRow>
								))
							}
							</TableBody>
							{this.state.isEditing && <UserEdit user={this.state.editingUser} open={this.state.isEditing} onRequestClose={() => {this.getUsers(); this.setState({isEditing: false}); }}/>}
						</Table>
					</Paper>
				</View>
			</ScrollView>
		);	
	}
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps) (withStyles(styleSheet)(Users));