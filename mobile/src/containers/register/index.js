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

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      loading: false,
    }
    this.sendRequest = this.sendRequest.bind(this);
  }
  
  sendRequest(event) {
    this.setState({
      loading: true,
    });
    
    api.post('/register', json(this.state)).then((res) => {
      this.setState({
        loading: false,
      });
      
      if (!res.ok) {
        return;
      } else if (res.status === 200) {
        AsyncStorage.setItem("token", res.data.user.token);
        this.props.dispatch(push('/register/verify'));    
      } 
    })
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

          <Grid
            container
            justify="center"
            align="stretch"
            direction="column"
            className={classes.grid}
            style={{marginTop:10}}
          >
            <TextField
              placeholder={`Your full name`}
              value={this.state.name}
              onChange={event => this.setState({name: event.target.value})}
              label="Fullname"
              margin="normal"
            />

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
              Register
            </Button><br/>

            <Typography
                type='body2' 
                align='center' 
                className={classes.typography}
            >
              Already have an account? 
              <span 
                style={{color:'green'}}
                onClick={() => this.props.dispatch(push('/login'))}
                className={classes.typography}
              > Login here</span>
            </Typography>
          </Grid>
          { this.state.loading && <Loader /> }
        </Grid>
      </div>
    );
  }
}

export default connect()(withStyles(styleSheets)(Register));