const pgp = require('pg-promise')();
const dbConfig = require('./dbConfig');

module.exports = pgp(dbConfig);
