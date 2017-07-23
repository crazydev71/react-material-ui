import React from 'react';
import { View } from 'react-native';
import { Route } from 'react-router';

import Login from '../containers/login';
import Register from '../containers/register';
import Verification from '../containers/verification';
import Dashboard from '../containers/dashboard';
// import Dashboard from '../containers/dashboard';
import History from '../containers/history';

const Routes = (props) => (
  <View>
    <Route exact path="/" component={Login}></Route>
    <Route exact path="/login" component={Login}></Route>
    <Route exact path="/register" component={Register}></Route>
    <Route exact path="/register/verify" component={Verification}></Route>
    <Route exact path="/dashboard" component={Dashboard}></Route>
    <Route path="/dashboard/history" component={History}></Route>
  </View>
);


export default Routes;