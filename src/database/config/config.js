
require('dotenv').config();

const { DB_HOST, DB_PASSWORD, DATABASE, DB_USERNAME, DB_PORT } = process.env;

module.exports = {
  "development": {
    "username": 'root',
    "password": 'password',
    "database": 'app-de-investimentos',
    "host": 'localhost',
    "port": 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": 'sql10508355',
    "password": '7gFFNrKuWA',
    "database": 'sql10508355',
    "host": 'sql10.freesqldatabase.com',
    "port": 3306,
    "dialect": "mysql"
  
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DATABASE,
    "host": DB_HOST,
    "dialect": "mysql"
  }
}