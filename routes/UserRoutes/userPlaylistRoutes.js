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

userPlaylistsRouter.route("/discord/:id")
  .get(userPlaylistsController.getByDiscordId)

userPlaylistsRouter.route("/discord_id/:id/playlist_name/:name")
  .get(userPlaylistsController.getByDiscordIdAndPlaylistName)


module.exports = userPlaylistsRouter;
