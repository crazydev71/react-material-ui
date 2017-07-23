import React from 'react'
import {Image, Text, View, ScrollView, TextInput, Button, AsyncStorage} from 'react-native'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Logo from '../../assets/images/logo.png';
import { styles, colorStyles, sizeStyles, weightStyles } from '../../theme/style'
import {Loader, Title } from '../../components';

import {api, json} from '../../api';

class Home extends React.Component {

	componentDidMount() {
		api.post('/auth').then((res) => {
			console.log(res);
			if (!res.ok) {
				this.props.dispatch(push('/login'));
			} else if (res.status === 200) {
				this.props.dispatch(push('/dashboard/request'));
			} else if (res.status === 203) {
				this.props.dispatch(push('/register/verify'));
			}
		});
	}

	render() {
		return (
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
				<Loader/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
  return state;
}

const dispatchToProps = (dispatch) => ({
  dispatch
});
export default connect(mapStateToProps, dispatchToProps)(Home);