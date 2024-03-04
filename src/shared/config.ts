import assert from 'assert';
import dotenv from 'dotenv';

dotenv.config();

assert(process.env.DB_NAME, 'DB_NAME configuration is required.');
assert(process.env.DB_USER, 'DB_USER configuration is required.');
assert(process.env.DB_PWD, 'DB_PWD configuration is required.');
assert(process.env.PORT, 'PORT configuration is required.');

const config = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PWD: process.env.DB_PWD,
  PORT: process.env.PORT,
};

export default config;
