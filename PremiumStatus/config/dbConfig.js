module.exports = process.env.DATABASE_URL || {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'FiresideBOT',
    username: process.env.DB_USERNAME || process.env.DB_USERNAME_L,
    password: process.env.DB_PASSWORD || process.env.DB_PASSWORD_L
  }