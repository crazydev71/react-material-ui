import React from 'react'
import {Image, Text, View, ScrollView, TextInput, Button} from 'react-native'
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {api, json} from '../../api';

import Logo from '../../assets/images/logo.png';
import Spinner from 'react-md-spinner';
import {styles, colorStyles, sizeStyles, weightStyles} from './style'
import { Card, Loader, Title } from '../../components';


class Verification extends React.Component {
  constructor(props) {
    super(props);
    // this.handleChangeGender = this.handleChangeGender.bind(this);
    this.state = {
      phone: '+79084509407',
			smsCode: '',
      waitingSMS: false,
      loading: false,
    };
		this.requestSMSCode = this.requestSMSCode.bind(this);
		this.verifySMSCode = this.verifySMSCode.bind(this);
  }
	
	requestSMSCode () {
		this.setState({
			loading: true
		});
		api.post('/requestsmscode', json({phone: this.state.phone})).then((res) => {
			this.setState({
				loading: false
			});
			
			if (!res.ok)
				return;
			
			this.setState({waitingSMS: true});
		});
	}
	
	verifySMSCode () {
		
		this.setState({ loading: true })
		
		api.post('/verifysmscode', json({smsCode: this.state.smsCode})).then((res) => {
			
			this.setState({ loading: false });
			
			if (!res.ok)
				return;
			
			this.props.dispatch(push('/dashboard'));
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
			
					<View style={{margin: 30}}><br/></View>
			
          <MuiThemeProvider>
						<View style={styles.fullSupport}>

							<View>
								<Text style={ [{color: '#00a0ff'}, sizeStyles['normal'], weightStyles['bold']] }>Verify Phone</Text>
								<TextInput accessibilityLabel='Phone' placeholder={`Phone Number ( e.g +16475009320 )`} keyboardType="phone-pad" style={[styles.inputField]} 
									value={this.state.phone} 
									onChange={(event) => this.setState( { phone: event.target.value } )}
								/>
								<br/>
							</View>

							{!this.state.waitingSMS ? (
								<Button 
									accessibilityLabel="Press Button" 
									color="#2196F3" title="Request SMS Code" 
									onPress={() => this.requestSMSCode()}
								/>) : (
								<View>
									<Text style={ [{color: '#00a0ff'}, sizeStyles['normal'], weightStyles['normal']] }>
										Enter the SMS code or press &nbsp;
											<Text style={ [{color: '#006eaf'}, weightStyles['bold']]}  onPress={() => this.requestSMSCode()}>
												resend
											</Text>
									</Text>
											
									<TextInput accessibilityLabel='Verification Code' placeholder={`SMS Code ( e.g 620142 )`} keyboardType="phone-pad" style={[styles.inputField]}
										value={this.state.smsCode} 
										onChange={ (event) => this.setState({ smsCode: event.target.value }) }
									/>
									<Button 
										accessibilityLabel="Press Button" 
										color="#2196F3" 
										title="Send Code" 
										onPress={() => this.verifySMSCode()}
									/>
								</View>)
							}
							{this.state.isLoading && <View ><Spinner size={30}/></View>}
						</View>
          </MuiThemeProvider>
        </View>
      </ScrollView>
    );
  }
}

const  dispatchToProps = (dispatch) => ({
	dispatch
})

export default connect(null, dispatchToProps)(Verification);