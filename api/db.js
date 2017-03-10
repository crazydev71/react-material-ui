const env = process.env;
const db = {
  client: 'postgres',
  connection: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    charset: 'utf8',
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
};

const knex = require('knex')(db);
const DB = require('bookshelf')(knex);

export default DB;
