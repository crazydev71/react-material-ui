import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';	
import { AsyncStorage, View} from 'react-native';
import { ConnectedRouter, push } from 'react-router-redux';
import { MuiThemeProvider} from 'material-ui/styles/';
import { Toast } from 'react-native-redux-toast';

// configuration
import sagas from './sagas';
import {configureStore, history} from './configureStore';

// import Home from './containers/home';
import Routes from './routes';

const store = configureStore();
sagas.forEach((saga) => store.runSaga(saga));

class App extends Component {
	
	componentDidMount = async () => {
// 	injectTapEventPlugin();
		const token = await AsyncStorage.getItem('token');
		if (!token)
			store.dispatch(push('/login'));
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