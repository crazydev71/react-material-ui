import React from 'react'
import {Image, Text, View, ScrollView, TextInput, Button, AsyncStorage} from 'react-native'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import Grid, { GridItems } from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import { ToasterActions } from '../../components/Toaster';
import Logo from '../../assets/images/logo.png';
import {api, json} from '../../api';


import { styles, colorStyles, sizeStyles, weightStyles } from '../../theme/style'
import {Loader, Title } from '../../components';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

const styleSheets = theme => ({
  logo: {
    maxWidth: 300,
    height: '100%'
  },
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
        <Grid 
          container
          justify="center"
        >
          <img
            src={Logo}
            className={classes.logo}
          />
          <Typography type='title' className={classes.title}> Massage that Travels </Typography>
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text style={[
              { textAlign: 'center', marginTop: 30, },
              colorStyles['gray'],
              sizeStyles['normal'],
              weightStyles['bold']
            ]}> Travel Areas in the 6ix </Text>
            <Text style={[
              { textAlign: 'center' },
              colorStyles['gray'],
              sizeStyles['small'],
              weightStyles['bold']
            ]}>We service York, North-York, East York, Etobicoke, Scarborough, and Old Toronto</Text>
          </View>
      
          { !this.state.loading ? 
             <View style={styles.fullSupport}>
               <TextInput
                 accessibilityLabel='Email'
                 placeholder={`Your account email`}
                 value={this.state.email}
                 onChange={(event) => {this.setState({email: event.target.value})}}      
                 style={[
                    {marginTop: 50},
                    styles.inputField,
                 ]}
               />

               <TextInput
                 secureTextEntry={true}
                 accessibilityLabel='Password'
                 placeholder={`Your account password`}
                 value={this.state.password}
                 onChange={(event) => {this.setState({password: event.target.value})}}      
                 onSubmitEditing={() => this.sendRequest()}
                 style={[
                   styles.inputField,
                 ]}
               /><br/>

               <Button
                 accessibilityLabel="Login"
                 color="#2196F3"
                 onPress={() => this.sendRequest()}
                 title="Login"
               /><br/>
               <Text style={[
                            { textAlign: 'center' },
                            colorStyles['gray'],
                            sizeStyles['small']
                            ]}>
                 Don't you have an account? Please <Text style={[colorStyles[`green`],]} onPress={() => this.props.dispatch(push('/register'))}>register here</Text>
               </Text>
             </View> : <Loader /> }
        </Grid>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps)(withStyles(styleSheets)(Login));