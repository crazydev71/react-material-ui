import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { View } from 'react-native';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import HistoryIcon from 'material-ui-icons/History';
import ContactMailIcon from 'material-ui-icons/ContactMail';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import AttachMoneyIcon from 'material-ui-icons/AttachMoney';


const styleSheet = createStyleSheet('Sidebar', {
  list: {
    width: 250,
    flex: 'initial',
  },
  listFull: {
    width: 'auto',
    flex: 'initial',
  },
});

class SideBar extends Component
{
 
  constructor (props) {
    super(props);
    this.state = {
      open: props.open  
    };
  }
  
  componentWillReceiveProps (props) {
    this.setState({open: props.open});
  }
  
  render() {
    const classes = this.props.classes;
    
    const sideList = (
      <View>
        <List className={classes.list} disablePadding>
          <ListItem button onClick={() => this.props.dispatch(push('/dashboard/request'))}>
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary="Request" />
          </ListItem>
          <ListItem button onClick={() => this.props.dispatch(push('/dashboard/history'))}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
          <ListItem button onClick={() => this.props.dispatch(push('/dashboard/transaction'))}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItem>
        </List>
      
        <Divider />
      
        <List className={classes.list} disablePadding>
          <ListItem button onClick={() => {this.props.dispatch({type: "LOG_OUT"}); this.props.dispatch(push('/login'));}}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="LogOut" />
          </ListItem>
        </List>
      </View>
    );

    return (
      <View>
      <Drawer
        open={this.props.open}
        onRequestClose={this.props.handleClose}
        onClick={this.props.handleClose}>
          {sideList}
        </Drawer>
      </View>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStatetoProps = (state, ownProps) => ({
  user: state.user
})

const dispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(mapStatetoProps, dispatchToProps)(withStyles(styleSheet)(SideBar));