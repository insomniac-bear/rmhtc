const MODE = process.env.NODE_ENV;

module.exports.API_PREFIX = '/api/v1';

module.exports.PORT = 8000;

module.exports.SERVER_URL = MODE === 'production'
  ? process.env.PROD_SERVER_URL
  : MODE === 'development'
  ? process.env.DEV_SERVER_URL
  : process.env.LOCAL_SERVER_URL;

module.exports.DB_SERVER = MODE === 'production'
  ? process.env.DB_PROD_SERVER_URL
  : MODE === 'development'
  ? process.env.DB_DEV_SERVER_URL
  : process.env.DB_LOCAL_SERVER_URL;
module.exports.DB_PORT = MODE === 'production'
  ? process.env.DB_PROD_SERVER_PORT
  : MODE === 'development'
  ? process.env.DB_DEV_SERVER_PORT
  : process.env.DB_LOCAL_SERVER_PORT;
module.exports.DB_NAME = MODE === 'production'
  ? process.env.DB_PROD_NAME
  : MODE === 'development'
  ? process.env.DB_DEV_NAME
  : process.env.DB_LOCAL_NAME;
module.exports.DB_USER = MODE === 'production'
  ? process.env.DB_PROD_USER
  : MODE === 'development'
  ? process.env.DB_DEV_USER
  : process.env.DB_LOCAL_USER;
module.exports.DB_PWD = MODE === 'production'
  ? process.env.DB_PROD_PWD
  : MODE === 'development'
  ? process.env.DB_DEV_PWD
  : process.env.DB_LOCAL_PWD;

module.exports.CLIENT_URL = MODE === 'local' ? 'http://localhost' : 'http://10.16.10.1';
module.exports.LOCAL_PORT = MODE === 'local' ? '3000' : MODE === 'development' ? '3002' : '3001';

module.exports.ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};

module.exports.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
module.exports.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
module.exports.SALT = 6;

module.exports.STORAGE_USER = process.env.STORAGE_USER;
module.exports.STORAGE_PASSWORD = process.env.STORAGE_PASSWORD;
module.exports.STORAGE_ROUTE = process.env.STORAGE_DEV_ROUTE;
module.exports.STORAGE_PUBLIC_BUCKET = process.env.STORAGE_PUBLIC_BUCKET;
module.exports.STORAGE_PRIVATE_BUCKET = process.env.STORAGE_PRIVATE_BUCKET;
