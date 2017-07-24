import { AsyncStorage } from 'react-native';
const initialState = {
    // user: null
};

export default (state=initialState, action) => {

    switch (action.type) {
        case 'SET_USER':
            return Object.assign({}, state, action.payload);
        case 'LOG_OUT':
            AsyncStorage.removeItem('token');
            return {};
        default:
            return state;
    }

}