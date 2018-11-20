const config = require('../config/config');

module.exports = {
  getUserSize(req, res, next) {
    res.json({message: "Getting Discord Users Count", data: config.Discord_Users_Count});
  }
}
