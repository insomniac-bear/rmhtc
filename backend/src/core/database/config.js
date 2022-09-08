module.exports = {
  development: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'rmhtc_local',
  },
  test: {
    dialect: 'postgres',
    host: '10.10.3.184',
    port: 5433,
    username: 'root',
    password: 'EWgjEgejIEgew',
    database: 'rmhtc_staging',
  },
  production: {
    dialect: 'postgres',
    host: '10.10.3.184',
    port: 5432,
    username: 'root',
    password: 'Fthm45ko',
    database: 'rmhtc_production',
  },
};
