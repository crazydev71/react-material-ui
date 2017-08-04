import apisauce from 'apisauce';
import {AsyncStorage} from 'react-native';
const baseURL = 'http://34.230.4.60:5000/api';

// const baseURL = 'http://192.168.0.114:5000/api';
let reduxStore = undefined;

export const json = (data) => {
  return JSON.stringify(data);
}

export const api = apisauce.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const setStore = (store) => {
  reduxStore = store;
}
export const getStore = () => {
  return reduxStore;
}

api.addAsyncRequestTransform(request => async() => {
  const token = await AsyncStorage.getItem('token');
  if (token)
    request.headers['authorization'] = 'Bearer ' + token;
  else
    delete request.headers['authorization'];
  if (reduxStore)
    reduxStore.dispatch({type: "SET_LOADER", payload: true});
});

api.addResponseTransform(response => {
  if (reduxStore)
    reduxStore.dispatch({type: "SET_LOADER", payload: false});
})