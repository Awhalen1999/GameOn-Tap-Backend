import postgres from 'postgres';
import 'dotenv/config';

const sql = postgres({
  host: process.env.GAMEONTAP_DB_HOST,
  port: Number(process.env.GAMEONTAP_DB_PORT),
  database: process.env.GAMEONTAP_DB_NAME,
  user: process.env.GAMEONTAP_DB_USER,
  password: process.env.GAMEONTAP_DB_PASSWORD,
});

export default sql;
