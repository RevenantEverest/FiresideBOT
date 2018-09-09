const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM users');
  },
  findOne(id) {
    return db.one('SELECT * FROM playlists WHERE playlist_id = $1', id);
  },
  findByUser(id)  {
    return db.many('SELECT * FROM playlists WHERE user_id = $1', id);
  },
  save(user) {
    return db.one('INSERT INTO users (user_id, name) VALUES($/user_id/, $/name/) RETURNING *');
  }
};
