import DB from '../config/db';

const User = DB.Model.extend({ tableName: "users" });

export default User;