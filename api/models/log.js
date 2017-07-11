import DB from '../config/db';

const Log = DB.Model.extend({ tableName: "logs" });

export default Log;