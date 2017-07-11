import DB from '../config/db';
const Contact = DB.Model.extend({
  tableName: "contacts"
});
export default Contact;