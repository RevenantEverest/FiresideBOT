const guildsDB = require('../../models/GuildModels/guildsDB');

module.exports = {
  index(req, res, next) {
    guildsDB.findAll()
      .then(guilds => {
        res.json({ message: 'Getting all bot guilds', data: guilds });
      })
      .catch(err => { console.log("Failed at Guild Index"); next(err); });
  },
  getOne(req, res, next) {
    guildsDB.findById(req.params.id)
      .then(guild => {
        res.json({ message: 'Getting Bot Guild', data: guild })
      })
      .catch(err => { console.log("Failed at Guild Get One"); next(err); });
  },
  checkIfExists(req, res, next) {
    guildsDB.ifExists(req.params.id)
      .then(guild => {
        if(guild.count === "0")
          res.json({ message: "Guild Does Not Exist", data: false });
        else if(guild.count === "1")
          res.json({ message: "Guild Does Exist", data: true });
      })
      .catch(err => { console.log("Failed at Guild Check If Exists"); next(err); });
  },
  create(req, res, next) {
    guildsDB.save(req.body)
      .then(guild => {
        res.json({ message: 'Adding Bot Guild', data: guild });
      })
      .catch(err => { console.log("Failed at Guild Create"); next(err); });
  },
  delete(req, res, next) {
    guildsDB.destroy(req.params.id)
      .then(guild => console.log("Guild Removed"))
      .catch(err => { console.log("Failed at Guild Delete"); next(err); });
  },

  /* ======== SETTINGS ======== */
  getSettings(req, res, next) {
    guildsDB.findSettings(req.params.id)
      .then(settings => {
        res.json({ message: "Getting Settings", data: settings });
      })
      .catch(err => { console.log("Failed at Guild Get Settings"); next(err); });
  },
  setDefaultSettings(req, res, next) {
    guildsDB.saveDefaultSettings(req.body)
      .then(settings => {
        res.json({ message: "Setting Default Settings", data: settings });
      })
      .catch(err => { console.log("Failed at Guild Set Default Settings"); next(err); });
  },
  updateSettings(req, res, next) {
    guildsDB.updateSettings(req.body)
      .then(settings => {
        res.json({ message: "Updating Settings", data: settings });
      })
      .catch(err => { console.log("Failed at Guild Update Settings"); next(err); });
  }
};
