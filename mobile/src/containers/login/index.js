import React from 'react'
import {Image, Text, View, ScrollView, TextInput, Button, AsyncStorage} from 'react-native'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { ToastActionsCreators } from 'react-native-redux-toast';

import {api, json} from '../../api';

import Logo from '../../assets/images/logo.png';
import { styles, colorStyles, sizeStyles, weightStyles } from '../../theme/style'
import {Loader, Title } from '../../components';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

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
  
  
  sendRequest(event) {
    this.setState({
      loading: true,
    });
    
    api.post('/login', json(this.state)).then((res) => {
      this.setState({
        loading: false,
      });
      
      if (!res.ok) {
        
        this.props.dispatch(ToastActionsCreators.displayError("Invalid username or password!", 2000));
        return;
        
      } else if (res.status === 200) {
        
        this.props.dispatch(ToastActionsCreators.displayInfo("Login succeeded!", 2000));
        AsyncStorage.setItem("token", res.data.user.token);
        this.props.dispatch(push('/dashboard/request'));
        
      } else if (res.status === 203) {
        
        this.props.dispatch(ToastActionsCreators.displayWarning("Please verify you!", 2000));
        AsyncStorage.setItem("token", res.data.user.token);
        this.props.dispatch(push('/register/verify'));
      }
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.card}>
        <View>
          <Image
            resizeMode={Image.resizeMode.contain}
            source={{ uri: Logo }}
            style={styles.image}
          />
          <Title> Massage that Travels </Title>
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
                 accessibilityLabel='Password'
                 placeholder={`Your account password`}
                 value={this.state.password}
                 onChange={(event) => {this.setState({password: event.target.value})}}      
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
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const dispatchToProps = (dispatch) => ({
  dispatch
});
export default connect(mapStateToProps, dispatchToProps)(Login);