const db = require('../../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM user_songs');
  },
  findOne(id) {
    return db.oneOrNone('SELECT * FROM user_songs WHERE song_id = $1', id);
  },
  something(id) {
    return db.one('SELECT * FROM user_songs JOIN user_playlists ON user_songs.playlist_id = user_playlists.playlist_id WHERE song_id = $1', id);
  },
  findByPlaylistId(id) {
    return db.many(`SELECT * FROM user_songs WHERE playlist_id = $1`, id);
  },
  save(song) {
    return db.one(`INSERT INTO user_songs (playlist_id, title, link, duration, author, thumbnail_url)
    VALUES
    ($/playlist_id/, $/title/, $/link/, $/duration/, $/author/, $/thumbnail_url/)
    RETURNING *`, song);
  },
  destroy(id) {
    return db.none('DELETE FROM user_songs WHERE song_id = $1', id);
  },
  deletePlaylistSongs(id) {
    return db.none('DELETE FROM user_songs WHERE playlist_id = $1', id);
  }
};
