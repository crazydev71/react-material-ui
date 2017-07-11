import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware, routerReducer} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';

import * as reducers from './reducers';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routerReduxMiddleware = routerMiddleware(history);

export function configureStore(initialState = fromJS({})) {
  const middlewares = [
    routerReduxMiddleware,
    sagaMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

//   if (__DEV__) {
//     enhancers.push(devTools());
//   }

  const store = createStore(
    combineReducers({...reducers, routing: routerReducer}),
    initialState,
    compose(...enhancers)
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;

  return store;
}

// module.exports = configureStore;