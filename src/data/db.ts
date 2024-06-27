//.env file import

import postgres from 'postgres';

const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: 'gameontap',
  user: 'postgres',
  password: 'abc',
});

export default sql;
