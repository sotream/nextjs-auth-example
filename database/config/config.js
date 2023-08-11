module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './database/db-dev.sqlite3'
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory',
    logging: false
  },
  production: {
    dialect: 'sqlite',
    storage: './database/db-prod.sqlite3',
    logging: false
  }
};
