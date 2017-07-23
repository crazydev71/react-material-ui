import React from 'react';
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
  
  handleOpenSideBar = () => this.setState({sideBarOpen: true})
  handleCloseSideBar = () => this.setState({sideBarOpen: false})
  
  render () {
    const classes = this.props.classes;
    return (
      <View className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu" onClick={()=>this.handleOpenSideBar()}>
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Dashboard
            </Typography>
            <Button color="contrast">LogOut</Button>
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

export default withStyles(styleSheet)(Dashboard);