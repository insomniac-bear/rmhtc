const Sequelize = require('sequelize');
const { DB_SERVER, DB_PORT, DB_NAME, DB_USER, DB_PWD } = require('../const');

const smthIsNotDefined = [DB_SERVER, DB_PORT, DB_NAME, DB_USER, DB_PWD].some((it) => it === undefined);

if (smthIsNotDefined) {
  throw new Error('One or more enviromental variables are not defined');
}

module.exports = new Sequelize(
  DB_NAME, DB_USER, DB_PWD, {
    host: DB_SERVER,
    port: DB_PORT,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 10000,
      idle: 10000,
    },
    logging: false,
  }
);
