import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';	
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// configuration
import sagas from './sagas';
import configureStore from './configureStore';

// import containers
import Home from './containers/home';
import Register from './containers/register';
import Verification from './containers/verification';
import Dashboard from './containers/dashboard';

const store = configureStore();
const history = createHistory();

sagas.forEach((saga) => store.runSaga(saga));

class App extends Component {
	render () {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<div>
						<Route exact path="/" component={Home}></Route>
						<Route exact path="/register" component={Register}></Route>
						<Route exact path="/register/verification" component={Verification}></Route>
						<Route exact path="/dashboard" component={Dashboard}></Route>
					</div>
				</ConnectedRouter>
			</Provider>
		)
	}
}

export default App;