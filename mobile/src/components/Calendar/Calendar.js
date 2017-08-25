import React from 'react';
import CalendarContainer from './src/components/CalendarContainer';

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
      <CalendarContainer 
        bookings={this.props.bookings}
        timeSlot={this.props.timeSlot}
        timeSlices={this.props.timeSlices}
        timeExceptions={this.props.timeExceptions}
        body={this.props.children}
        canViewBooking={this.props.canViewBooking}
        onDayClick={this.props.onDayClick}
        displayPast={this.props.displayPast}
      />
    );
  }
}
