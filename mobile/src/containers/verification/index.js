import React from 'react'
import {Image, Text, View, ScrollView, TextInput, Button} from 'react-native'
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import request from 'superagent';
import Logo from '../../assets/images/logo.png';
import Spinner from 'react-md-spinner';
import {styles, colorStyles, sizeStyles, weightStyles} from './style'
import { Card, Loader, Title } from '../../components';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

let APIURL = 'http://localhost:5000';
if (process.env.NODE_ENV !== 'development') {
  APIURL = `${window.location.origin}:5000`;
}

class Verification extends React.Component {
  constructor(props) {
    super(props);
    // this.handleChangeGender = this.handleChangeGender.bind(this);
    this.state = {
      phone: '',
      waitingSMS: false,
      loading: false,
    }
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
					<View style={{margin: 30}}><br/></View>
          <MuiThemeProvider>
						<View style={styles.fullSupport}>

							<View>
								<Text style={ [{color: '#00a0ff'}, sizeStyles['normal'], weightStyles['bold']] }>Verify Phone</Text>
								<TextInput accessibilityLabel='Phone' placeholder={`your phone number`} keyboardType="phone-pad" style={[styles.inputField]}/>
								<br/>
							</View>

							{!this.state.waitingSMS ? (
								<Button accessibilityLabel="Press Button" color="#2196F3" title="Send Code" onPress={()=>this.setState({waitingSMS:true})}/>
									) : (
								<View>
									<Text style={ [{color: '#00a0ff'}, sizeStyles['normal'], weightStyles['normal']] }>Enter the verfication code we sent you via SMS</Text>
									<TextInput accessibilityLabel='Verification Code' placeholder={`Verification Code`} keyboardType="phone-pad" style={[styles.inputField]}/>
									<Button accessibilityLabel="Press Button" color="#2196F3" title="Send Code" onPress={()=>this.setState({isLoading:true})}/>
								</View>)
							}

							{/*{this.state.isLoading && <View ><Spinner size={30}/></View>}*/}
						</View>
          </MuiThemeProvider>
        </View>
      </ScrollView>
    );
  }
}


export default Verification;