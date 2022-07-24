"use strict";
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
        "username": 'root',
        "password": 'password',
        "database": 'app-de-investimentos-test',
        "host": 'localhost',
        "port": 3306,
        "dialect": "mysql"
    },
    "production": {
        "username": DB_USERNAME,
        "password": DB_PASSWORD,
        "database": DATABASE,
        "host": DB_HOST,
        "port": DB_PORT,
        "dialect": "postgres"
    }
};
