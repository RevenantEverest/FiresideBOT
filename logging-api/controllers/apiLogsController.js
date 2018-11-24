const db = require('../models/apiLogsDB');

module.exports = {
  index(req, res, next) {
    db.findAll()
      .then(results => {
        res.json({ message: "Getting All API Logs", data: results });
      })
      .catch(err => next(err));
  },
  getOne(req, res, next) {
    db.findById(re.params.id)
      .then(results => {
        res.json({ message: "Getting API Log By Id", data: results.data });
      })
      .catch(err => next(err));
  },
  create(req, res, next) {
    db.save(req.body)
      .then(results => {
        res.json({ message: "Saving API Log", data: results.data });
      })
      .catch(err => next(err));
  }
}
