import React from 'react';
import { Provider } from 'react-redux';

import CalendarContainer from './src/components/CalendarContainer';
import store from './src/Store';

export default class Calendar extends React.Component {
  static defaultProps = {
      bookings: [],
      timeSlices: [],
      timeSlot: 30,
      timeExceptions: [],
      displayPast: false
  };

  render() {
    return (
      <Provider store={store}>
        <CalendarContainer bookings={this.props.bookings}
                  timeSlot={this.props.timeSlot}
                  timeSlices={this.props.timeSlices}
                  timeExceptions={this.props.timeExceptions}
                  body={this.props.children}
                  canViewBooking={this.props.canViewBooking}
                  onDayClick={this.props.onDayClick}
                  displayPast={this.props.displayPast} />
      </Provider>
    );
  }
}
