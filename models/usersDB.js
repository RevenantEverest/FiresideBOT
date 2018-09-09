const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM users');
  },
  findOne(id) {
    return db.one('SELECT * FROM users WHERE user_id = $1', id);
  },
  save(user) {
    return db.one('INSERT INTO users (username, password) VALUES ($/username/, $/password/) RETURNING *', user);
  }
}
