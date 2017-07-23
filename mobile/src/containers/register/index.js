import React from 'react'
import { Image, Text, View, ScrollView, TextInput, Button, AsyncStorage} from 'react-native'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {connect} from 'react-redux';
import { push } from 'react-router-redux';

import Logo from '../../assets/images/logo.png';
import { styles, colorStyles, sizeStyles } from '../../theme/style'
import { Loader } from '../../components';
import { api, json } from '../../api';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

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
    return (
      <ScrollView contentContainerStyle={styles.card}>
        <View>
          <Image
            resizeMode={Image.resizeMode.contain}
            source={{ uri: Logo }}
            style={styles.image}
          />
      
          { !this.state.loading ? <View>
             <View style={styles.fullSupport}>
              <TextInput
                 accessibilityLabel='Fullname'
                 placeholder={`FullName`}
                 value={this.state.name}
                 onChange={(event) => {this.setState({name: event.target.value})}}      
                 style={[
                    {marginTop: 50},
                    styles.inputField,
                 ]}
               />
               <TextInput
                 accessibilityLabel='Email'
                 placeholder={`Your account email`}
                 value={this.state.email}
                 onChange={(event) => {this.setState({email: event.target.value})}}      
                 style={[
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
               /><br/><br/><br/>
                        
               <Button
                 accessibilityLabel="Register"
                 color="#2196F3"
                 onPress={() => this.sendRequest()}
                 title="Register"
               /><br/>
                   
               <Text style={[
                            { textAlign: 'center' },
                            colorStyles['gray'],
                            sizeStyles['small']
                            ]}>
                 Already have an account? Please <Text style={[colorStyles[`green`],]} onPress={() => this.props.dispatch(push('/login'))}>login here</Text>
               </Text>
             </View>
          </View> : <Loader /> }
        </View>
      </ScrollView>
    );
  }
}
const dispatchToProps = (dispatch) => ({
  dispatch
});
export default connect(null, dispatchToProps)(Register);