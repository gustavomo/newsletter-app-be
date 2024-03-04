import assert from 'assert';
import dotenv from 'dotenv';

dotenv.config();

assert(process.env.DB_NAME, 'DB_NAME configuration is required.');
assert(process.env.DB_USER, 'DB_USER configuration is required.');
assert(process.env.DB_PWD, 'DB_PWD configuration is required.');
assert(process.env.PORT, 'PORT configuration is required.');
assert(process.env.FROM_EMAIL, 'FROM_EMAIL configuration is required.');
assert(process.env.BUCKET_NAME, 'BUCKET_NAME configuration is required.');
assert(process.env.AWS_REGION, 'AWS_REGION configuration is required.');
assert(process.env.AWS_ACCESS_KEY_ID, 'AWS_ACCESS_KEY_ID configuration is required.');
assert(process.env.AWS_SECRET_ACCESS_KEY, 'AWS_SECRET_ACCESS_KEY configuration is required.');
assert(process.env.EMAIL_URL, 'EMAIL_URL configuration is required.');

const config = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PWD: process.env.DB_PWD,
  PORT: process.env.PORT,
  FROM_EMAIL: process.env.FROM_EMAIL,
  BUCKET_NAME: process.env.BUCKET_NAME,
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  EMAIL_URL: process.env.EMAIL_URL,
};

export default config;
