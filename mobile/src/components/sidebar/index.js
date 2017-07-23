import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { View } from 'react-native';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import HistoryIcon from 'material-ui-icons/History';
import ContactMailIcon from 'material-ui-icons/ContactMail';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';


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
          <ListItem button>
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary="Request" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
        </List>
      
        <Divider />
      
        <List className={classes.list} disablePadding>
          <ListItem button>
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

export default withStyles(styleSheet)(SideBar);