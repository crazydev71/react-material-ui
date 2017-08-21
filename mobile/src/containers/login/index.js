import React from 'react'
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import Grid, { GridItems } from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import { ToasterActions } from '../../components/Toaster';
import { Loader } from '../../components';
import Logo from '../../assets/images/logo.png';

import {api, json} from '../../api';

const styleSheets = theme => ({
  logo: {
    maxHeight: 70,
    marginTop: 70,
  },
  container: {
    padding: 30
  },
  typography: {
    color: 'gray'
  },
  grid: {
    flexGrow: 1,
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      msg: '',
      loading: false,
    }
    this.sendRequest = this.sendRequest.bind(this);
  }
  
  
  sendRequest() {
    this.setState({
      loading: true,
    });
    
    api.post('/login', json(this.state)).then((res) => {
      this.setState({
        loading: false,
      });
      
      if (!res.ok) {
        
        this.props.dispatch(ToasterActions.showToaster("Invalid username and password!", 'failed', 3000));
        return;
        
      } else if (res.status === 200) {

        AsyncStorage.setItem("token", res.data.user.token);
        this.props.dispatch({type:"SET_USER", payload: res.data.user});
        this.props.dispatch(ToasterActions.showToaster("Login succeeded!", 'success', 3000));
        if (res.data.user.role == 'client')
          this.props.dispatch(push('/dashboard/request'));
        else
          this.props.dispatch(push('/dashboard/client-requests'));
        
      } else if (res.status === 203) {

        AsyncStorage.setItem("token", res.data.user.token);
        this.props.dispatch({type:"SET_USER", payload: res.data.user});
        this.props.dispatch(ToasterActions.showToaster("Please verify you!", 'warning', 3000));
        this.props.dispatch(push('/register/verify'));
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Grid 
          container
          justify="center"
          direction="column"
          align="center"
          className={classes.grid}
        >
          <img
            src={Logo}
            className={classes.logo}
          />

          <Typography 
            type='title' 
            className={classes.typography} 
            align='center'
          >
            Massage that Travels
          </Typography>

          <Typography
            type='body1'
            align='center' 
            className={classes.typography}
            style={{marginTop: 20}}
          > 
            Travel Areas in the 6ix 
          </Typography>
          
          <Typography 
            type='caption' 
            align='center' 
            className={classes.typography}
          >
            We service York, North-York, East York, Etobicoke, Scarborough, and Old Toronto
          </Typography>

          <Grid
            container
            justify="center"
            align="stretch"
            direction="column"
            className={classes.grid}
            style={{marginTop:10}}
          >
            <TextField
              placeholder={`Your account email`}
              value={this.state.email}
              onChange={(event) => {this.setState({email: event.target.value})}}
              label="Email"
              margin="normal"
              type="email"
            />

            <TextField
              placeholder={`Your account password`}
              value={this.state.password}
              onChange={(event) => {this.setState({password: event.target.value})}}
              label="Password"
              margin="normal"
              type="password"
            /><br/>

            <Button
              color="primary"
              onClick={() => this.sendRequest()}
              raised
            >
              Login
            </Button><br/>
            <Typography
              type='body2' 
              align='center' 
              className={classes.typography}
            >
              Don't you have an account? 
              <span 
                style={{color:'green'}}
                onClick={() => this.props.dispatch(push('/register'))}
                className={classes.typography}
              > Register here</span>
            </Typography>
          </Grid>
          { this.state.loading && <Loader /> }
        </Grid>
      </div>
    );
  }
}

export default connect()(withStyles(styleSheets)(Login));