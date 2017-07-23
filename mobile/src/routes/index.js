import React from 'react';
import { View } from 'react-native';
import { Route } from 'react-router';

import Login from '../containers/login';
import Register from '../containers/register';
import Verification from '../containers/verification';
import Dashboard from '../containers/dashboard';
import Home from '../containers/home';
import History from '../containers/history';
import Request from '../containers/request';
import Transaction from '../containers/transaction';

const Routes = (props) => (
  <View>
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/login" component={Login}></Route>
    <Route exact path="/register" component={Register}></Route>
    <Route exact path="/register/verify" component={Verification}></Route>
    <Route path="/dashboard" component={Dashboard}></Route>
    <Route path="/dashboard/history" component={History}></Route>
    <Route path="/dashboard/request" component={Request}></Route>
    <Route path="/dashboard/transaction" component={Transaction}></Route>
  </View>
);


export default Routes;