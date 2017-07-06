import React from 'react'
import {Image, Text, View, ScrollView, TextInput, Button} from 'react-native'
import {connect} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import request from 'superagent';
import Logo from '../../assets/images/logo.png';
import { styles, colorStyles, sizeStyles, weightStyles } from './style'
import { Card, Loader, Title } from '../../components';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let APIURL = 'http://localhost:5000';
if (process.env.NODE_ENV !== 'development') {
  APIURL = `${window.location.origin}:5000`;
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeGender = this.handleChangeGender.bind(this);
    this.state = {
      name: '',
      phone: '',
      comment: '',
      gender: 'male',
      loading: false,
    }
    console.log("-------------------register-------------------------");
  }
  handleChangeGender(event, index, value) {
    this.setState({
      gender: value
    });
  }
  sendRequest(event) {
    const self = this;
    this.setState({
      loading: true,
    });
    request.post(`${APIURL}/contact`, this.state).then((res) => {
      self.setState({
        name: '',
        phone: '',
        comment: '',
        gender: 'male',
        loading: false,
      });
      alert("A Mendr RMT will contact you shortly.");
    });
  }

  _onBlur(type, event) {
    const option = {};
    option[type] = event.target.value;

    this.setState({
      ...option
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
          { !this.state.loading ? <MuiThemeProvider>
             <View style={styles.fullSupport}>
               <TextInput
                 accessibilityLabel='Name'
                 placeholder={`your name`}
                 onChange={this._onBlur.bind(this, 'name')}
                 style={[
                   styles.inputField,
                 ]}
               /> <br/>

               <TextInput
                 accessibilityLabel='Phone'
                 placeholder={`your phone number`}
                 keyboardType="phone-pad"
                 onChange={this._onBlur.bind(this, 'phone')}
                 style={[
                   styles.inputField,
                 ]}
               /><br/>

               <SelectField
                 style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}
                 floatingLabelText="preferred gender of masseuse:"
                 value={this.state.gender}
                 onChange={this.handleChangeGender}
               >
                 <MenuItem value="male" primaryText="Massuer (Male)" />
                 <MenuItem value="female" primaryText="Masseuse (Female)" />
                 <MenuItem value="couple" primaryText="Other" />
               </SelectField><br/>


               <TextInput
                 accessibilityLabel='Additional Notes'
                 onChange={this._onBlur.bind(this, 'comment')}
                 maxNumberOfLines={5}
                 multiline
                 numberOfLines={5}
                 style={{ padding: 20 }}
                 placeholder={`Comments`}
               /> <br/>

               <Button
                 accessibilityLabel="Find Local RMT Now"
                 color="#2196F3"
                 onPress={this.sendRequest.bind(this)}
                 title="Find Local RMT Now"
               />

             </View>
          </MuiThemeProvider> : <Loader /> }
        </View>
      </ScrollView>
    );
  }
}

export default Register;