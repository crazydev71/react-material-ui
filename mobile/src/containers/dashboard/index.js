import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { View } from 'react-native';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import SideBar from '../../components/sidebar';

import {api} from '../../api';

const styleSheet = createStyleSheet('ButtonAppBar', {
  root: {
//     marginTop: 30,
//     width: '100%',
  },
  flex: {
    flex: 1,
  },
});

class Dashboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      sideBarOpen: false
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
  
  render () {
    const classes = this.props.classes;
    return (
      <View className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.flex}>
              Dashboard
            </Typography>
            <IconButton color="contrast" aria-label="Menu" onClick={()=>this.handleOpenSideBar()}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <SideBar open={this.state.sideBarOpen} handleClose={this.handleCloseSideBar} handleOpen={this.handleOpenSideBar}/>
      </View>
    );  
  }  
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps) (withStyles(styleSheet)(Dashboard));