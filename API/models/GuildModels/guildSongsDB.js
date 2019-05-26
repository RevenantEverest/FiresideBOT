const db = require('../../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM guild_songs');
  },
  findOne(id) {
    return db.oneOrNone('SELECT * FROM guild_songs WHERE song_id = $1', id);
  },
  findByPlaylistId(id) {
    return db.many(`SELECT * FROM guild_songs WHERE playlist_id = $1`, id);
  },
  save(song) {
    return db.one(`INSERT INTO guild_songs (playlist_id, title, link, duration, author, thumbnail_url)
    VALUES
    ($/playlist_id/, $/title/, $/link/, $/duration/, $/author/, $/thumbnail_url/)
    RETURNING *`, song);
  },
  destroy(id) {
    return db.none('DELETE FROM guild_songs WHERE song_id = $1', id);
  }
};
