const db = require('../../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM user_playlists');
  },
  findOne(id) {
    return db.one('SELECT * FROM user_playlists WHERE playlist_id = $1', id);
  },
  findByUserId(id)  {
    return db.many('SELECT * FROM user_playlists WHERE user_id = $1', id);
  },
  findByPlaylistName(playlistName) {
    return db.one(`SELECT * FROM user_playlists WHERE name = $1`, playlistName);
  },
  save(playlist) {
    return db.one('INSERT INTO user_playlists (user_id, name) VALUES($/user_id/, $/name/) RETURNING *', playlist);
  },
  delete(id) {
    return db.none('DELETE FROM user_playlists WHERE playlist_id = $1', id);
  }
};
