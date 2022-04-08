const db = require('../../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM user_playlists');
  },
  findOne(id) {
    return db.one('SELECT * FROM user_playlists WHERE playlist_id = $1', id);
  },
  findByDiscordId(id) {
    return db.many(`SELECT * FROM user_playlists WHERE discord_id = $1`, id);
  },
  findByPlaylistName(playlistName) {
    return db.one(`SELECT * FROM user_playlists WHERE name = $1`, playlistName);
  },
  findByDiscordIdAndPlaylistName(playlist) {
    return db.one(`SELECT * FROM user_playlists WHERE discord_id = $/discord_id/ AND name = $/name/`, playlist);
  },
  save(playlist) {
    return db.one('INSERT INTO user_playlists (discord_id, public, name) VALUES($/discord_id/, $/public/, $/name/) RETURNING *', playlist);
  },
  update(playlist) {
    return db.one(`UPDATE user_playlists
    SET
    public = $/public/,
    name = $/name/
    WHERE discord_id = $/discord_id/ AND playlist_id = $/playlist_id/
    RETURNING *`, playlist);
  },
  deleteByNameAndDiscordId(playlist) {
    return db.none('DELETE FROM user_playlists WHERE name = $/name/ AND WHERE discord_id = $/discord_id/');
  },
  delete(id) {
    return db.none('DELETE FROM user_playlists WHERE playlist_id = $1', id);
  }
};