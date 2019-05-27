const currencyDB = require('../models/currencyDB');
const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
  getByGuildId(req, res, next) {
    currencyDB.findCurrencySettings(req.params.id)
    .then(settings => res.json({ message: "Getting Currency Settings", data: settings }))
    .catch(err => next(err));
  },
  update(req, res, next) {
    currencyDB.updateCurrencySettings(req.body)
    .then(settings => res.json({ message: "Updating Currency Settings", data: settings }))
    .catch(err => next(err))
  }
}
