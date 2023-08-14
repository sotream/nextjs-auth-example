module.exports = {
  development: {
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dialect: 'postgres',
    dialectModule: require('pg'),
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    migrationStorageTableName: 'Migrations',
    seederStorageTableName: 'SeederData'
  },
  production: {
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dialect: 'postgres',
    dialectModule: require('pg'),
    host: process.env.POSTGRES_HOST,
    migrationStorageTableName: 'Migrations',
    seederStorageTableName: 'SeederData'
  }
};
