/* eslint-disable no-console */
import dotenv from 'dotenv'
import logger from '../server/common/Logger';

dotenv.config();

console.log(`Environment: ${process.env.NODE_ENV}`);

export const enviroment = {
  dbConfig: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    schema: process.env.DATABASE_SCHEMA,
  },
  App: {
    id: process.env.APP_ID || 'open-makert-api',
    port: process.env.APP_PORT || 80,
  },
  logLevel: process.env.LOG_LEVEL || 'debug',
  logging: (sql, timing) => {
    logger.info(sql, typeof timing === 'number' ? `Δ: ${timing}ms` : '')
  }
};
