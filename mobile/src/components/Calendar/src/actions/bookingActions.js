export const ADD_BOOKING = 'ADD_BOOKING';
export const DELETE_BOOKING = 'DELETE_BOOKING';
export const INIT_BOOKINGS = 'INIT_BOOKINGS';

export function addBookingAction(data) {
  const booking = Object.assign(data, { isBooked: true });
  return {
    type: ADD_BOOKING,
    data: booking
  };
}

export function deleteBookingAction(data) {
  return {
    type: DELETE_BOOKING,
    data
  }
}

export function initBookingsAction(data) {
  return {
    type: INIT_BOOKINGS,
    data
  };
}
