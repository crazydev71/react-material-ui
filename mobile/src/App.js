import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';	
import { AsyncStorage} from 'react-native';
import { ConnectedRouter, push } from 'react-router-redux';


// configuration
import sagas from './sagas';
import {configureStore, history} from './configureStore';

// import Home from './containers/home';
import Register from './containers/register';
import Verification from './containers/verification';
import Dashboard from './containers/dashboard';
import Login from './containers/login';

const store = configureStore();

sagas.forEach((saga) => store.runSaga(saga));

class App extends Component {
	
	componentDidMount = async () => {
		const token = await AsyncStorage.getItem('token');
		if (!token)
			store.dispatch(push('/login'));
	}
	
	render () {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<div>
						<Route exact path="/" component={Login}></Route>
						<Route exact path="/login" component={Login}></Route>
						<Route exact path="/register" component={Register}></Route>
						<Route exact path="/register/verify" component={Verification}></Route>
						<Route exact path="/dashboard" component={Dashboard}></Route>
					</div>
				</ConnectedRouter>
			</Provider>
		)
	}
}

export default App;