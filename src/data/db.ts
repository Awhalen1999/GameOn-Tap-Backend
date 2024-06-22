import postgres from 'postgres';

// GAMEONTAP_DB_HOST
// GAMEONTAP_DB_PASSWORD, etc
const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: 'gameontap',
  user: 'postgres',
  password: 'abc',
});

export default sql;
