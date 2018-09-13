const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM users');
  },
  findById(id) {
    return db.one('SELECT * FROM users WHERE user_id = $1', id);
  },
  save(user) {
    return db.one('INSERT INTO users (username, password) VALUES ($/username/, $/password/) RETURNING *', user);
  },
  findSettings(id) {
    return db.one('SELECT * FROM user_settings WHERE user_id = $1', id);
  },
  updateSettings(settings) {
    return db.one('UPDATE user_settings SET prefix = $/prefix/ WHERE user_id = $/user_id/ RETURNING *', settings)
  }
}
