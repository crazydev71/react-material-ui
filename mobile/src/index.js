import React from 'react'
import { AppRegistry, Image, StyleSheet, Text, View, ScrollView, TextInput, Button} from 'react-native'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import request from 'superagent';
import Spinner from 'react-md-spinner';
import Logo from './logo.png'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let APIURL = 'http://localhost:5000';
if (process.env.NODE_ENV !== 'development') {
  APIURL = `${window.location.origin}/api`;
}



const Loader = () => <div style={{ marginTop: '200px', marginLeft: '50%' }}>
  <Spinner size={50} />
</div>;
const Card = ({ children }) => <View style={styles.card}>{children}</View>
const Title = ({ children }) => <Text style={styles.title}>{children}</Text>

class App extends React.Component {
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
      alert("Thanks!, We will contact with you soon!");
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
          <Title> Massage that travels </Title>
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
                 placeholder={`Name`}
                 onChange={this._onBlur.bind(this, 'name')}
                 style={[
                   styles.inputField,
                 ]}
               /> <br/>

               <TextInput
                 accessibilityLabel='Phone'
                 placeholder={`Phone`}
                 keyboardType="phone-pad"
                 onChange={this._onBlur.bind(this, 'phone')}
                 style={[
                   styles.inputField,
                 ]}
               /><br/>

               <SelectField
                 style={{ width: '100%' }}
                 floatingLabelText="Please select"
                 value={this.state.gender}
                 onChange={this.handleChangeGender}
               >
                 <MenuItem value="male" primaryText="Male" />
                 <MenuItem value="female" primaryText="Female" />
                 <MenuItem value="couple" primaryText="Couple (Male & Female)" />
               </SelectField><br/>


               <TextInput
                 accessibilityLabel='Comments'
                 onChange={this._onBlur.bind(this, 'comment')}
                 maxNumberOfLines={5}
                 multiline
                 numberOfLines={5}
                 style={{ padding: 20 }}
                 placeholder={`Comments`}
               /> <br/>

               <Button
                 accessibilityLabel="Contact Masseuse Now"
                 color="#2196F3"
                 onPress={this.sendRequest.bind(this)}
                 title="Contact Masseuse Now"
               />

             </View>
          </MuiThemeProvider> : <Loader /> }
        </View>
      </ScrollView>
    );
  }
}
// Styles
const styles = StyleSheet.create({
  card: {
  //  flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: '1.25rem',
    color: '#666666',
  },
  fullSupport: {
    flex: 1,
    padding: 20
  },
  inputField: {
    borderColor: '#ddd',
    padding: 20,
    borderBottomWidth: 0.5
  },
  image: {
    marginTop: '100px',
    justifyContent: 'center',
    //width: 100,
    height: 70,
  }
})


const colorStyles = StyleSheet.create({
  white: { color: 'white' },
  gray: { color: 'gray' },
  red: { color: 'red' }
})

const sizeStyles = StyleSheet.create({
  small: { fontSize: '0.85rem', padding: '0.5rem' },
  normal: { fontSize: '1rem', padding: '0.75rem' },
  large: { fontSize: '1.5rem', padding: '1rem' }
})

const weightStyles = StyleSheet.create({
  light: { fontWeight: '300' },
  normal: { fontWeight: '400' },
  bold: { fontWeight: '700' }
})

// App registration and rendering
AppRegistry.registerComponent('MendrApp', () => App)
AppRegistry.runApplication('MendrApp', { rootTag: document.getElementById('root') })
