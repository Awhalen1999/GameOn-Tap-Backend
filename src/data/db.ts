import postgres from 'postgres';
import 'dotenv/config';
import fs from 'fs';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

async function getCerts() {
  const s3 = new S3Client({ region: 'us-east-1' });

  try {
    const data = await s3.send(
      new GetObjectCommand({
        Bucket: 'gameontap-server-cert',
        Key: 'us-east-1-bundle.pem',
      })
    );

    // Read the body as a stream and convert it to a string
    const chunks = [];
    // @ts-ignore
    for await (const chunk of data.Body) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks).toString();
  } catch (error) {
    console.error('Error retrieving the certificate from S3:', error);
    throw error;
  }
}

async function createSqlConnection() {
  const certs = await getCerts();

  return postgres({
    host: process.env.GAMEONTAP_DB_HOST,
    port: Number(process.env.GAMEONTAP_DB_PORT),
    database: process.env.GAMEONTAP_DB_NAME,
    user: process.env.GAMEONTAP_DB_USER,
    password: process.env.GAMEONTAP_DB_PASSWORD,
    ssl: {
      ca: certs, // todo need to be a string
    },
  });
}

let sql: postgres.Sql;

(async () => {
  try {
    sql = await createSqlConnection();
    // You can now use sql here, or ensure it is correctly exported
  } catch (error) {
    console.error('Error creating the SQL client:', error);
  }
})();

export default sql;
