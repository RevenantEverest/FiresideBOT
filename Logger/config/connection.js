const pgp = require('pg-promise')();
const dbConfig = require('../config/dbConfig');

module.exports = pgp(dbConfig);
