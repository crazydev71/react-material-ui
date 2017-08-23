import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';


import SideBar from '../../components/sidebar';

import {api} from '../../api';

const styleSheet = theme => ({
  flex: {
    flex: 1,
  },
  loader: {
    width: '100%',
    position: 'absolute',
    bottom: -5,
    zIndex: '1000',
  },
  space: {
    height: 56,
    width: '100%'
  }
});

class Dashboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      sideBarOpen: false,
      title: "Dashboard"
    };
    
    this.handleOpenSideBar = this.handleOpenSideBar.bind(this);
    this.handleCloseSideBar = this.handleCloseSideBar.bind(this);
  }
  
  authUser = () => {
    api.post('/auth').then((res) => {
			if (!res.ok) {
				this.props.dispatch(push('/login'));
			} else if (res.status === 200) {
				this.props.dispatch({type: "SET_USER", payload: res.data.user});
			} else if (res.status === 203) {
				this.props.dispatch(push('/register/verify'));
			}
		});
  }

  handleOpenSideBar = () => this.setState({sideBarOpen: true})
  handleCloseSideBar = () => this.setState({sideBarOpen: false})

  componentDidMount = () => {
    this.authUser();
  }

  componentWillReceiveProps = (newProps) => {
    const path = newProps.location.pathname;
    switch (path) {
      case "/dashboard/history":
        this.setState({title: "History"});
        break;
      case "/dashboard/request":
        this.setState({title: "Send Request"});
        break;
      case "/dashboard/transactions":
        this.setState({title: "Transactions"});
        break;
      case "/dashboard/users":
        this.setState({title: "Users"});
        break;
      case "/dashboard/profile":
        this.setState({title: "Manage Profile"});
        break;
      case "/dashboard/client-requests":
        this.setState({title: "Client Requests"});
        break;
      default:
        this.setState({title: "Dashboard"});
        break;
    }
  }
  
  render () {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.flex}>
              {this.state.title}
            </Typography>
            <IconButton color="contrast" aria-label="Menu" onClick={()=>this.handleOpenSideBar()}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
          {this.props.loader.isLoading && <LinearProgress color="accent" className={classes.loader}></LinearProgress>}
        </AppBar>
        <div className={classes.space}/>
        <SideBar open={this.state.sideBarOpen} handleClose={this.handleCloseSideBar} handleOpen={this.handleOpenSideBar}/>
      </div>
    );  
  }  
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  loader: state.loader,
  location: state.routing, 
  user: state.user
});

export default connect(mapStateToProps, null) (withStyles(styleSheet)(Dashboard));