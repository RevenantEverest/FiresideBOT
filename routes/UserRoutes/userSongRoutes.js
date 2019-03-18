const express = require('express');
const userSongsController = require('../../controllers/UserControllers/userSongsController');
const userSongsRouter = express.Router();

userSongsRouter.route("/")
  .get(userSongsController.index)
  .post(userSongsController.addSong)

userSongsRouter.route("/playlist/:id")
  .get(userSongsController.getByPlaylistId)

userSongsRouter.route("/song_id/:id")
  .delete(userSongsController.delete)

module.exports = userSongsRouter;
