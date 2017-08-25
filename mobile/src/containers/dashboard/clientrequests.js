import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import Card, { CardContent } from 'material-ui/Card';
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';	

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
              (user.role==='employee' && user.gender===filter) && (
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


const styleSheet = theme => ({
  button: {
		width: 30,
		height: 30
	},
	container: {
		padding: 10
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
		height: '9px'
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
	},
	filter: {
		marginBottom: 10,
	},
	filterButton: {
		fontSize: 12,
		padding: 5,
		fontWeight: 'bold'
	}
});


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
			filters: {
				status: 'assigned',
				requestTime: 'ASC',
				createdTime: ''
			},
			anchorEl: undefined,
			open: false,
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

	updateRequest(id, status) {
		const index = this.state.requests.findIndex((request) => {return request.id==id});
		console.log(index);
		if (this.props.user.role === 'admin') {

			this.setState({settingIndex: index, settingStatus: status, isSetting: true, settingGender:this.state.requests[index].gender});
		} else if (this.props.user.role === 'employee') {
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

	handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

	render () {
		const classes = this.props.classes;
		const filters = this.state.filters;
		let filteredRequests = this.state.requests;
		if (filters.status !== '')
			filteredRequests = filteredRequests.filter( request => request.status==this.state.filters.status );
		if (filters.createdTime !== '')
			filteredRequests = filteredRequests.sort((a,b)=>{ 
				if (this.state.filters.createdTime === 'ASC') {
					if (!a.created_at) return false;
					if (!b.created_at) return true;
					return a.created_at >= b.created_at;
				} else if (this.state.filters.requestTime === 'DESC') {
					if (!a.created_at) return true;
					if (!b.created_at) return false;
					return a.created_at < b.created_at;
				}
				return false;
			});

		if (filters.requestTime !== '')
			filteredRequests = filteredRequests.sort((a,b)=>{ 
				if (this.state.filters.requestTime === 'ASC') {
					if (!a.request_time) return false;
					if (!b.request_time) return true;
					return a.request_time >= b.request_time;
				} else if (this.state.filters.requestTime === 'DESC') {
					if (!a.request_time) return true;
					if (!b.request_time) return false;
					return a.request_time < b.request_time;
				}
			});
		
		return (
			<div className={classes.container}>
				<div className={classes.filter}>
					<Button color="accent" onClick={this.handleClick} className={classes.filterButton}>
						{filters.status === '' && 'All'}
						{filters.status === 'open' && 'New'}
						{filters.status === 'assigned' && 'Accepted'}
						{filters.status === 'completed' && 'Completed'}
					</Button><br/>
					<Menu
						id="simple-menu"
						anchorEl={this.state.anchorEl}
						open={this.state.open}
						onRequestClose={this.handleRequestClose}
					>
						<MenuItem onClick={() => {this.handleRequestClose(); this.setState({filters: {...filters, status: ''}})}}>All</MenuItem>
						<MenuItem onClick={() => {this.handleRequestClose(); this.setState({filters: {...filters, status: 'open'}})}}>New</MenuItem>
						<MenuItem onClick={() => {this.handleRequestClose(); this.setState({filters: {...filters, status: 'assigned'}})}}>Accepted</MenuItem>
						<MenuItem onClick={() => {this.handleRequestClose(); this.setState({filters: {...filters, status: 'completed'}})}}>Completed</MenuItem>
					</Menu>
					<Button 
						className={classes.filterButton}
						color="primary" 
						onClick={()=>this.setState({filters: {...filters, requestTime: filters.requestTime == 'ASC' ? 'DESC' : 'ASC', createdTime: ''}})}
					>
						Time Requested {filters.requestTime === 'ASC' ? String.fromCharCode( "8593" ) : (filters.requestTime === 'DESC' ? String.fromCharCode( "8595" ) : '')}
					</Button>
					<Button 
						className={classes.filterButton}
						color="primary" 
						onClick={()=>this.setState({filters: {...filters, createdTime: filters.createdTime == 'ASC' ? 'DESC' : 'ASC', requestTime: ''}})}
					>
						Time Created {filters.createdTime === 'ASC' ? String.fromCharCode( "8593" ) : (filters.createdTime === 'DESC' ? String.fromCharCode( "8595" ) : '')}
					</Button>
					<Button 
						className={classes.filterButton}
						color="primary" 
						onClick={()=>this.setState({filters: {status:'', createdTime: '', requestTime: ''}})}
					>
						No Sorting
					</Button>
				</div>
				{
					filteredRequests.map((n, index) => (
						<Slide key={n.id} in={this.state.isLoaded} enterTransitionDuration={500} leaveTransitionDuration={500} direction="down">
							<Card className={classes.card} raised>
								<CardContent className={classes.cardContent}>
									{n.gender==='male' && <Avatar style={{background:"#673AB7", color:"white", float:'left', marginRight: 10}}>M</Avatar>}
									{n.gender==='female' && <Avatar style={{background:"#FF5722", color:"white", float:'left', marginRight: 10}}>Fe</Avatar>}
									{n.gender==='other' && <Avatar style={{background:"#607D8B", color:"white", float:'left', marginRight: 10}}>X</Avatar>}
									<div style={{display:'block', marginLeft: "50px", overflow: 'wrap'}}>
										<Typography type="subheading">Request from {n.name}</Typography>
										<Typography type="body2">Comment: {n.comment}</Typography>
										<Typography type="body2">Requested Time: {n.request_time ? n.request_time : "ASAP"}</Typography>
									</div>
								
								<Divider/>
								<div className={classes.cardActions}>
									<span className={classes.time}>{n.created_at}</span>
									{n.status==='open' && <Button dense color="primary" className={classes.actionButton} onClick={() => this.updateRequest(n.id, 'assigned')}>Accept</Button>}
									{n.status==='assigned' && <Button dense color="primary" className={classes.actionButton} onClick={() => this.updateRequest(n.id, 'completed')}>Completed</Button>}
									{/* <Button dense className={classes.actionButton}>Decline</Button> */}
								</div>
								{n.status==='open' && <div className={classes.status}>New !</div>}
								{n.status==='assigned' && <div className={classes.status} style={{backgroundColor:'#3F51B5'}}>Accepted</div>}
								{n.status==='completed' && <div className={classes.status} style={{backgroundColor:'#009688'}}>Completed</div>}
								</CardContent>
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