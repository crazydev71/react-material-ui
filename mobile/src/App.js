import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { configureStore, history } from './configureStore';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { blue, pink, red } from 'material-ui/colors';

import { api, setStore } from './api';
import Toaster from './components/Toaster';
import sagas from './sagas';
import Routes from './routes';

// configuration
injectTapEventPlugin();
const store = configureStore();
sagas.forEach((saga) => store.runSaga(saga));
setStore(store);

const theme = createMuiTheme({
	palette: createPalette({
		primary: blue, // Purple and green play nicely together.
		accent: {
			...pink,
			A400: '#EC407A',
		},
		error: red,
	}),
});

class App extends Component {

	componentDidMount = async () => {
		api.post('/auth').then((res) => {
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
				<MuiThemeProvider theme={theme}>
					<div>
						<ConnectedRouter history={history} >
							<Routes/>
						</ConnectedRouter>
						<Toaster />
					</div>
				</MuiThemeProvider>
			</Provider>
		)
	}
}

export default App;