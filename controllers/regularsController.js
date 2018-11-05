const regularsDB = require('../models/regularsDB');
const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
  index(req, res, next) {
    regularsDB.findAll()
      .then(regulars => {
        res.json({ message: "Getting Regulars", data: regulars });
      })
      .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) {
          res.json({
            message: "No Regulars Found",
            data: {}
          })
        }
        else next(err);
      })
  },
  getOne(req, res, next) {
    regularsDB.findById(req.params.id)
      .then(regular => {
        res.json({ message: "Getting Regular By Id", data: regular });
      })
      .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) {
          res.json({
            message: "No Regulars Found",
            data: {}
          })
        }
        else next(err);
      })
  },
  getByChannelName(req, res, next) {
    regularsDB.findByChannelName(req.params.channel)
      .then(regulars => {
        res.json({ message: "Getting Regulars by channel name", data: regulars });
      })
      .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) {
          res.json({
            message: "No Regulars Found",
            data: {}
          })
        }
        else next(err);
      })
  },
  create(req, res, next) {
    regularsDB.save(req.body)
      .then(regular => {
        res.json({ message: "Saving Regular", data: regular });
      })
      .catch(err => next(err));
  },
  update(req, res, next) {
    regularsDB.update(req.body)
      .then(regular => {
        res.json({ message: "Updating Regular", data: regular });
      })
      .catch(err => next(err));
  },
  delete(req, res, next) {
    regularsDB.delete(req.params.id)
      .catch(err => next(err));
  }
}
