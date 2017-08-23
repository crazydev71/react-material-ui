import React from 'react';
import { View } from 'react-native';
import { Route } from 'react-router';

import Login from '../containers/login';
import Register from '../containers/register';
import Verification from '../containers/verification';
import Home from '../containers/home';

import Dashboard from '../containers/dashboard';
import Users from '../containers/dashboard/users';
import ClientRequests from '../containers/dashboard/clientrequests';
import Transactions from '../containers/dashboard/transactions';
import History from '../containers/dashboard/history';
import Profile from '../containers/dashboard/profile';
import Request from '../containers/dashboard/request';
import TimeTable from '../containers/dashboard/timetable';

const Routes = (props) => (
  <View>
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/login" component={Login}></Route>
    <Route exact path="/register" component={Register}></Route>
    <Route exact path="/register/verify" component={Verification}></Route>
    
    <Route path="/dashboard" component={Dashboard}></Route>
    <Route path="/dashboard/history" component={History}></Route>
    <Route path="/dashboard/request" component={Request}></Route>
    <Route path="/dashboard/transactions" component={Transactions}></Route>
    <Route path="/dashboard/users" component={Users}></Route>
    <Route path="/dashboard/client-requests" component={ClientRequests}></Route>
    <Route path="/dashboard/profile" component={Profile}></Route>
    <Route path="/dashboard/timetable" component={TimeTable}></Route>
  </View>
);


export default Routes;