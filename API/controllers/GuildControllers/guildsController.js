const guildsDB = require('../../models/GuildModels/guildsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
  index(req, res, next) {
    guildsDB.findAll()
    .then(guilds => res.json({ message: 'Getting all bot guilds', data: guilds }))
    .catch(err => next(err));
  },
  getOne(req, res, next) {
    guildsDB.findById(req.params.id)
    .then(guild => res.json({ message: 'Getting Bot Guild', data: guild }))
    .catch(err => next(err));
  },
  checkForGuild(req, res, next) {
    guildsDB.findById(req.params.id)
    .then(guild => res.json({ message: "Guild Found", data: { guild: true } }))
    .catch(err => {
      if(err instanceof QRE && err.code === qrec.noData)
        res.json({ message: "No Guild Found", data: { guild: false } });
      else next(err);
    });
  },
  create(req, res, next) {
    guildsDB.save(req.body)
    .then(guild => res.json({ message: 'Adding Bot Guild', data: guild }))
    .catch(err => next(err));
  }
};
