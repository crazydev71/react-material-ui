import React from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, View, TextInput, Button, Image } from 'react-native';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import { ToastActionsCreators } from 'react-native-redux-toast';



import Spinner from 'react-md-spinner';
import Logo from '../../assets/images/logo.png';
import { Card } from '../../components';
import { HistoryTable } from '../../components';
import { styles, colorStyles, sizeStyles, weightStyles } from '../../theme/style'

import { api, json } from '../../api';

class Request extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			logs: [],
			gender: 'male',
			comment: '',
			loading: false
		}
		this.sendRequest = this.sendRequest.bind(this);
		this.getLogs = this.getLogs.bind(this);
		this.handleChangeGender = this.handleChangeGender.bind(this);
	}
	
	getLogs () {
		api.get('/logs').then((res) => {
			console.log (res);
			if (res.ok)
				this.setState({logs: res.data});
		});
	}
	
	handleChangeGender(event, value) {
    this.setState({
      gender: value
    });
  }
	
	sendRequest(event) {
    this.setState({ loading: true });
		const postData = {
			gender: this.state.gender,
			comment: this.state.comment,
		};
		
		api.post('/request', json(postData)).then((res) => {
			this.setState({ loading: false });
			if (res.ok)
				this.props.dispatch(ToastActionsCreators.displayInfo("Mendr will contact you soon. Thanks", 3000));
			else
				this.props.dispatch(ToastActionsCreators.displayInfo("Whoops, something went wrong!", 3000));
		});
  }
	
	componentDidMount() {
		this.getLogs();
	}
	render () {
		return (
        <ScrollView>
			<View>
				<Image
					resizeMode={Image.resizeMode.contain}
					source={{ uri: Logo }}
					style={styles.image}
				/>
			</View>
            <View style={[{padding: 20}]}> 
                <Text style={[{marginTop: 50},sizeStyles['medium'], colorStyles['gray'], weightStyles['bold']]}>Twilio Form (Send Message)</Text>
                
                <RadioGroup
                    aria-label="Gender"
                    name="gender"
                    selectedValue={this.state.gender}
                    onChange={this.handleChangeGender}
                    row
                >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup> 
                <br/>

                <TextInput
                    accessibilityLabel='Additional Notes'
                    onChange={(event) => this.setState({comment: event.target.value})}
                    maxNumberOfLines={3}
                    multiline
                    numberOfLines={3}
                    style={{ padding: 10, borderStyle: 'solid', borderWidth: 1 }}
                    placeholder={`Comments`}
                /> <br/>

                <Button
                    accessibilityLabel="Find Local RMT Now"
                    color="#2196F3"
                    onPress={() => this.sendRequest()}
                    title="Find Local RMT Now"
                />
                {this.state.loading && <Spinner style={{marginTop: 20, marginLeft: 'auto', marginRight: 'auto'}} size={30}/>}
            </View>
        </ScrollView>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps) (Request);