import DB from '../config/db';
import Fields from 'bookshelf-schema/lib/fields'

const { StringField, EmailField, DateTimeField} = Fields.StringField;

const User = DB.Model.extend({ tableName: "users" });

export default User;