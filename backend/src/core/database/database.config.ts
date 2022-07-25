import * as dotenv from 'dotenv';

import { IDatabaseConfig } from './interfaces/dbConfig.interface';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
  local: {
    username: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PWD,
    database: process.env.DB_LOCAL_NAME,
    host: process.env.DB_LOCAL_HOST,
    port: Number(process.env.DB_LOCAL_PORT),
    dialect: process.env.DB_DIALECT,
    logging: false,
  },
  development: {
    username: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PWD,
    database: process.env.DB_DEV_NAME,
    host: process.env.DB_DEV_HOST,
    port: Number(process.env.DB_DEV_PORT),
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.DB_PROD_USER,
    password: process.env.DB_PROD_PWD,
    database: process.env.DB_PROD_NAME,
    host: process.env.DB_PROD_HOST,
    port: Number(process.env.DB_PROD_PORT),
    dialect: process.env.DB_DIALECT,
  },
};
