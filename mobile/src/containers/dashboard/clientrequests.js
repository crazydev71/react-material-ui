import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

import { api, json } from '../../api';

class UserList extends React.Component {
  render() {
    const {filter, users, onSetUser, onRequestClose, ...other } = this.props;
    return (
			<Dialog onRequestClose={onRequestClose} {...other}>
        <DialogTitle>Assign {filter} employee</DialogTitle>
				
        <div>
          <List>
						<Divider/>
            {this.props.users.map(user =>
              (user.role=='employee' && user.gender==filter) && (
								<div key={user.id}>
									<ListItem button onClick={() => {onRequestClose(); onSetUser(user)}}>
										{user.gender==='male' && <Avatar style={{background:"#673AB7", color:"white", float:'left', marginRight: 10}}>M</Avatar>}
										{user.gender==='female' && <Avatar style={{background:"#FF5722", color:"white", float:'left', marginRight: 10}}>Fe</Avatar>}
										{user.gender==='other' && <Avatar style={{background:"#607D8B", color:"white", float:'left', marginRight: 10}}>X</Avatar>}
										<ListItemText primary={user.name} />
									</ListItem>
									<Divider/>
								</div>
							)
            )}
          </List>
        </div>
				<DialogActions>
					 <Button raised color="accent" onClick={() => onRequestClose()}>Cancel</Button> 
				</DialogActions>
      </Dialog>
    );
  }
}

UserList.propTypes = {
	users: PropTypes.array,
	filter: PropTypes.string,
  onSetUser: PropTypes.func,
  onRequestClose: PropTypes.func
};


const styleSheet = createStyleSheet(theme => ({
  button: {
		width: 30,
		height: 30
	},
	container: {
		padding: 20
	},
	card: {
		marginBottom: 10,
		position: 'relative',
		background: '#FAFAFA',
	},
	cardContent: {
		padding	:10
	},
	cardActions: {
		display: 'float',
		padding: 0,
		margin:0,
	},
	actionButton: {
		float: 'right',
	},
	time: {
		float: 'left',
		color: '#FFB74D',
		padding: 6
	},
	status: {
		color: 'white',
		background: '#E91E63',
		position: 'absolute',
		fontWeight: 'bold',
		fontSize: 12,
		top:0,
		right: 0,
		padding: 5
	}
}));


class ClientRequests extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isLoaded: false,
			requests: [],
			users: [],
			settingIndex: 0,
			settingStatus: '',
			settingGender: '',
			isSetting: false,
		}
		this.getUsers = this.getUsers.bind(this);
		this.getRequests = this.getRequests.bind(this);
		this.updateRequest = this.updateRequest.bind(this);
		this.onSettedUser = this.onSettedUser.bind(this);
	}
	
	getRequests () {
		api.get('/requests').then((res) => {
			if (res.ok)
				this.setState({requests: res.data, isLoaded: true});
		});
	}

	getUsers () {
		api.get('/users').then((res) => {
			if (res.ok)
				this.setState({users: res.data});
		});
	}


	
	componentDidMount() {
		this.getUsers();
		this.getRequests();
	}

	onSettedUser (user) {
		api.put('/request', json({
			request_id: this.state.requests[this.state.settingIndex].id,
			status: this.state.settingStatus,
			handler_id: user.id,
			handler_name: user.name
		})).then((res) => {
			if (res.ok)
				this.state.requests[this.state.settingIndex] = res.data;
				this.setState({});
		});
	}

	updateRequest(index, status) {
		if (this.props.user.role == 'admin') {
			this.setState({settingIndex: index, settingStatus: status, isSetting: true, settingGender:this.state.requests[index].gender});
		} else if (this.props.user.role == 'employee') {
			api.put('/request', json({
				request_id: this.state.requests[index].id,
				status: status
			})).then((res) => {
				console.log(res);
				if (res.ok) {
					this.state.requests[index] = res.data;
					this.setState({});
				}
			});
		}
	}

	render () {
		const classes = this.props.classes;
		return (
			<div className={classes.container}>
			{
				this.state.requests.map((n, index) => (
					<Slide key={n.id} in={this.state.isLoaded} enterTransitionDuration={500} leaveTransitionDuration={500} direction="down">
						<Card className={classes.card} raised>
							<CardContent className={classes.cardContent}>
								
								<div style={{display:'float'}}>
									{n.gender==='male' && <Avatar style={{background:"#673AB7", color:"white", float:'left', marginRight: 10}}>M</Avatar>}
									{n.gender==='female' && <Avatar style={{background:"#FF5722", color:"white", float:'left', marginRight: 10}}>Fe</Avatar>}
									{n.gender==='other' && <Avatar style={{background:"#607D8B", color:"white", float:'left', marginRight: 10}}>X</Avatar>}
									<Typography type="subheading">Request from {n.name}</Typography>
									<Typography type="body2">{n.comment}</Typography>
								</div>
							</CardContent>
							<Divider/>
							<div className={classes.cardActions}>
								<Typography className={classes.time}>{n.created_at}</Typography>
								{n.status==='open' && <Button dense color="primary" className={classes.actionButton} onClick={() => this.updateRequest(index, 'assigned')}>Accept</Button>}
								{n.status==='assigned' && <Button dense color="primary" className={classes.actionButton} onClick={() => this.updateRequest(index, 'completed')}>Completed</Button>}
								{/* <Button dense className={classes.actionButton}>Decline</Button> */}
							</div>
							{n.status==='open' && <div className={classes.status}>New !</div>}
							{n.status==='assigned' && <div className={classes.status} style={{backgroundColor:'#3F51B5'}}>Accepted</div>}
							{n.status==='completed' && <div className={classes.status} style={{backgroundColor:'#009688'}}>Completed</div>}
						</Card>
					</Slide>
				))
			}
			<UserList open={this.state.isSetting}
			 	filter={this.state.settingGender}
				users={this.state.users}  
				onSetUser={this.onSettedUser}
				onRequestClose={() => this.setState({isSetting: false})}>
			</UserList> 
			</div>
		);
	}
}

const mapStateToProps = state => ({user: state.user});
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps) (withStyles(styleSheet)(ClientRequests));