const Discord_Bot = require('../Discord_Bot');
const currencyDB = require('../models/discordCurrencyDB');
const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
  index(req, res, next) {
    currencyDB.findAll()
    .then(results => res.json({ message: 'Getting all Discord Currencies', data: results }))
    .catch(err => next(err));
  },
  getOne(req, res, next) {
    currencyDB.findById(req.params.id)
    .then(results => res.json({ message: 'Getting Discord Currency By Id', data: results }))
    .catch(err => next(err));
  },
  getByDiscordId(req, res, next) {
    currencyDB.findByDiscordId(req.params.id)
    .then(results => res.json({ message: 'Getting Discord Currency By Discord Id', data: results }))
    .catch(err => next(err));
  },
  getByGuildId(req, res, next) {
    currencyDB.findByGuildId(req.params.id)
    .then(results => {
      let currencyData = [];
      results.forEach(el => {
        let discord_username = null;
        let avatarURL = null;
        if(Discord_Bot.guilds.get(req.params.id).members.get(el.discord_id) !== undefined) {
          discord_username = Discord_Bot.guilds.get(req.params.id).members.get(el.discord_id).user.username;
          avatarURL = Discord_Bot.guilds.get(req.params.id).members.get(el.discord_id).user.avatar;
        }
        currencyData.push({ 
          id: el.id, currency: parseInt(el.currency, 10).toLocaleString(), 
          discord_username: discord_username, discord_id: el.discord_id, 
          guild_id: el.guild_id, avatarUrl: avatarURL
        })
      })
      res.json({ message: 'Getting Discord Currency By Guild Id', data: currencyData });
    })
    .catch(err => next(err));
  },
  getByDiscordIdAndGuildId(req, res, next) {
    currencyDB.findByDiscordIdAndGuildId(req.body)
    .then(results => res.json({ message: '', data: results }))
    .catch(err => next(err));
  },
  create(req, res, next) {
    currencyDB.save(req.body)
    .then(results => res.json({ message: 'Saving Discord Currency Entry', data: results }))
    .catch(err => next(err));
  },
  update(req, res, next) {
    currencyDB.update(req.body)
    .then(results => res.json({ message: 'Updating Discord Currency Entry', data: results }))
    .catch(err => next(err));
  },
  delete(req, res, next) {
    currencyDB.delete(req.params.id)
    .then(() => res.json({ message: 'Deleteing Discord Currency Entry' }))
    .catch(err => next(err));
  }
}
