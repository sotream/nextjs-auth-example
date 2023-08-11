module.exports = {
  development: {
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dialect: 'postgres',
    dialectModule: require('pg'),
    host: process.env.POSTGRES_HOST,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true
      }
    }
  },
  production: {
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dialect: 'postgres',
    dialectModule: require('pg'),
    host: process.env.POSTGRES_HOST,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true
      }
    }
  }
};
