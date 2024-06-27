import postgres from 'postgres';

const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: 'gameontap',
  user: 'postgres',
  password: 'abc',
});

export default sql;

// const sql = postgres({
//   host: import.meta.env.VITE_GAMEONTAP_DB_HOST,
//   port: Number(import.meta.env.VITE_GAMEONTAP_DB_PORT),
//   database: import.meta.env.VITE_GAMEONTAP_DB_NAME,
//   user: import.meta.env.VITE_GAMEONTAP_DB_USER,
//   password: import.meta.env.VITE_GAMEONTAP_DB_PASSWORD,
// });
