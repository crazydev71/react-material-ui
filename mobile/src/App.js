import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { ConnectedRouter, push } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {configureStore, history} from './configureStore';
import {api, json, setStore} from './api';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { blue, pink, red } from 'material-ui/colors';
import { Toast } from 'react-native-redux-toast';
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

	constructor(props) {
		super(props);
	}
	
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
				<View>
					<MuiThemeProvider theme={theme}>
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