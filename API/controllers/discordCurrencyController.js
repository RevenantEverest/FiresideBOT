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
    .then(async results => {
      let currencyData = [];
      let guild = Discord_Bot.guilds.resolve(req.params.id);
      let guildMembers = [];

      await guild.members.fetch()
      .then(members => guildMembers = members.array())
      .catch(err => errorHandler(bot, message, err, "Error Parsing Custom Command", "Custom Command parser"));

      results.forEach(el => {
        let discordUser = guildMembers.filter(member => member.user.id === el.discord_id)[0];
        if(discordUser && discordUser !== undefined) {
          currencyData.push({ 
            id: el.id, currency: parseInt(el.currency, 10).toLocaleString(), 
            discord_username: discordUser.user.username, discord_id: el.discord_id, 
            guild_id: el.guild_id, avatarUrl: discordUser.user.avatar
          })
        }        
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
