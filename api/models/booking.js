import DB from '../config/db';

const Booking = DB.Model.extend({ tableName: "bookings" });

export default Booking;