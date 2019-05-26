//Twitch Banned Words Controller
const TBW_DB = require('../models/TBW_DB');

module.exports = {
  index(req, res, next) {
    TBW_DB.findAll()
      .then(bannedWords => {
        res.json({ message: "Getting all Banned Words", data: bannedWords });
      })
      .catch(err => next(err));
  },
  getOne(req, res, next) {
    TBW_DB.findById(req.params.id)
      .then(bannedWord => {
        res.json({ message: "Getting Banned Word", data: bannedWord });
      })
      .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) {
          res.json({
            message: "No Banned Words Found",
            data: {}
          })
        }
        else next(err);
      })
  },
  getByChannelName(req, res, next) {
    TBW_DB.findBYChannelName(req.params.id)
      .then(bannedWords => {
        res.json({ message: "Getting Banned Words by channel", data: bannedWords });
      })
      .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) {
          res.json({
            message: "No Banned Words Found",
            data: {}
          })
        }
        else next(err);
      })
  },
  getByBannedWord(req, res, next) {
    TBW_DB.findByBannedWord(req.params.bannedWord)
      .then(bannedWord => {
        res.json({ message: "Getting Banned Word by word", data: bannedWord });
      })
      .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) {
          res.json({
            message: "No Banned Words Found",
            data: {}
          })
        }
        else next(err);
      })
  },
  create(req, res, next) {
    TBW_DB.save(req.body)
      .then(bannedWord => {
        res.json({ message: "Saving Banned Word", data: bannedWord });
      })
      .catch(err => next(err))
  },
  update(req, res, next) {
    TBW_DB.update(req.body)
      .then(bannedWord => {
        res.json({ message: "Updating Banned Word", data: bannedWord });
      })
      .catch(err => next(err))
  },
  delete(req, res, next) {
    TBW_DB.delete(req.params.id)
      .catch(err => next(err));
  }
}
