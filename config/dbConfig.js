require('dotenv').config();

module.exports = process.env.DATABASE_URL || {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'FiresideBOT',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
}
