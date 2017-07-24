import DB from '../config/db';

const Request = DB.Model.extend({ tableName: "requests" });

export default Request;