const currencyDB = require('../models/discordCurrencyDB');
const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
  index(req, res, next) {
    currencyDB.findAll()
      .then(results => {
        res.json({ message: 'Getting all Discord Currencies', data: results });
      })
      .catch(err => {
        next(err);
      })
  },
  getOne(req, res, next) {
    currencyDB.findById(req.params.id)
      .then(results => {
        res.json({ message: 'Getting Discord Currency By Id', data: results });
      })
      .catch(err => {
        next(err);
      })
  },
  getByDiscordId(req, res, next) {
    currencyDB.findByDiscordId(req.params.id)
      .then(results => {
        res.json({ message: 'Getting Discord Currency By Discord Id', data: results });
      })
      .catch(err => {
        next(err);
      })
  },
  getByGuildId(req, res, next) {
    currencyDB.findByGuildId(req.params.id)
      .then(results => {
        res.json({ message: 'Getting Discord Currency By Guild Id', data: results });
      })
      .catch(err => {
        next(err);
      })
  },
  getByDiscordIdAndGuildId(req, res, next) {
    currencyDB.findByDiscordIdAndGuildId(req.body)
      .then(results => {
        res.json({ message: '', data: results });
      })
      .catch(err => {
        next(err);
      })
  },
  create(req, res, next) {
    currencyDB.save(req.body)
      .then(results => {
        res.json({ message: 'Saving Discord Currency Entry', data: results });
      })
      .catch(err => {
        next(err);
      })
  },
  update(req, res, next) {
    currencyDB.update(req.body)
      .then(results => {
        res.json({ message: 'Updating Discord Currency Entry', data: results });
      })
      .catch(err => {
        next(err);
      })
  },
  delete(req, res, next) {
    currencyDB.delete(req.params.id)
      .then(results => {
        res.json({ message: 'Deleteing Discord Currency Entry' });
      })
      .catch(err => {
        next(err);
      })
  }
}
