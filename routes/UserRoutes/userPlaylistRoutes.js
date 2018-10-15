const express = require('express');
const userPlaylistsController = require('../../controllers/UserControllers/userPlaylistsController');
const userPlaylistsRouter = express.Router();

userPlaylistsRouter.route("/")
  .get(userPlaylistsController.index)
  .post(userPlaylistsController.create)

userPlaylistsRouter.route("/playlistName/:playlist_name")
  .get(userPlaylistsController.getByPlaylistName)

userPlaylistsRouter.route("/delete/:id")
  .delete(userPlaylistsController.destroy)

userPlaylistsRouter.route("/user/:id")
  .get(userPlaylistsController.getByUserId)

module.exports = userPlaylistsRouter;
