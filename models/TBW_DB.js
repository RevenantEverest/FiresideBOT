//Twitch Banned Words DB
const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM twitch_banned_words');
  },
  findById(id) {
    return db.oneOrNone('SELECT * FROM twitch_banned_words WHERE banned_word_id = $1', id);
  },
  findBYChannelName(channel) {
    return db.oneOrNone('SELECT * FROM twitch_banned_words WHERE channel = $1', channel);
  },
  findByBannedWord(bannedWord) {
    return db.oneOrNone('SELECT * FROM twitch_banned_words WHERE banned_word = $1', bannedWord);
  },
  save(bannedWord) {
    return db.one(`INSERT INTO twitch_banned_words(channel, banned_word)
    VALUES($/channel/, $/banned_word/)
    RETURNING *`, regular);
  },
  update(bannedWord) {
    return db.one(`UPDATE twitch_banned_words
      SET
      channel = $/channel/,
      banned_words = $/banned_words/
      WHERE banned_word_id = $/banned_word_id/
      RETURNING *`, bannedWord);
  },
  delete(id) {
    return db.none('DELETE FROM twitch_banned_words WHERE banned_word_id = $1', id);
  }
}
