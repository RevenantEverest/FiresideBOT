const db = require('../../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM guild_playlists');
  },
  findOne(id) {
    return db.oneOrNone('SELECT * FROM guild_playlists WHERE playlist_id = $1', id);
  },
  findByGuildId(id)  {
    return db.many('SELECT * FROM guild_playlists WHERE guild_id = $1', id);
  },
  findByPlaylistName(playlistName) {
    return db.oneOrNone(`SELECT * FROM guild_playlists WHERE name = $1`, playlistName);
  },
  findByGuildIdAndPlaylistName(data) {
    return db.one('SELECT * FROM guild_playlists WHERE guild_id = $/guild_id/ AND name = $/name/', data);
  },
  save(playlist) {
    return db.one('INSERT INTO guild_playlists (guild_id, guild_name, name) VALUES($/guild_id/, $/guild_name/, $/name/) RETURNING *', playlist);
  },
  delete(id) {
    return db.none('DELETE FROM guild_playlists WHERE playlist_id = $1', id);
  }
}
