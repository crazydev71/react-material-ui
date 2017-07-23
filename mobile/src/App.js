import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';	
import { AsyncStorage, View} from 'react-native';
import { ConnectedRouter, push } from 'react-router-redux';
import { MuiThemeProvider} from 'material-ui/styles/';
import { Toast } from 'react-native-redux-toast';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// configuration
import sagas from './sagas';
import {configureStore, history} from './configureStore';
import {api, json} from './api';

import Routes from './routes';

const store = configureStore();
sagas.forEach((saga) => store.runSaga(saga));

class App extends Component {

	constructor(props) {
		super(props);
	}
	
	componentDidMount = async () => {
		
		api.post('/auth').then((res) => {
			console.log(res);
			if (!res.ok) {
				store.dispatch(push('/login'));
			} else if (res.status === 200) {
				store.dispatch({type: "SET_USER", payload: res.data.user});
			} else if (res.status === 203) {
				store.dispatch(push('/register/verify'));
			}
		});
	}
	
	render () {
		return (
			<Provider store={store}>
				<View>
					<MuiThemeProvider>
						<ConnectedRouter history={history} >
							<Routes/>
						</ConnectedRouter>
					</MuiThemeProvider>
					<Toast messageStyle={{ color: 'white' }} />
				</View>
			</Provider>
		)
	}
}

export default App;