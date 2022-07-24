
require('dotenv').config();

const { DB_HOST, DB_PASSWORD, DATABASE, DB_USERNAME, DB_PORT } = process.env;

module.exports = {
  "development": {
    "username": DB_USERNAME || 'root',
    "password": DB_PASSWORD || 'password',
    "database": 'app-de-investimentos',
    "host": DB_HOST || 'localhost',
    "port": DB_PORT || 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": 'root',
    "password": 'password',
    "database": 'app-de-investimentos-test',
    "host": 'localhost',
    "port": 3306,
    "dialect": "mysql"

  },
  "production": {
    "username": 'root',
    "password": 'password',
    "database": 'app-de-investimentos-test',
    "host": 'localhost',
    "dialect": "mysql"
  }
}