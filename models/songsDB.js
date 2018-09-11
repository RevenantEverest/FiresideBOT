const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM songs');
  },
  findOne(id) {
    return db.one('SELECT * FROM songs WHERE song_id = $1', id);
  },
  findByPlaylistId(id) {
    return db.many('SELECT * FROM songs WHERE playlist_id = $1', id);
  },
  save(song) {
    return db.one('INSERT INTO songs (playlist_id, title, link) VALUES ($/playlist_id/, $/title/, $/link/) RETURNING *', song);
  }
}
