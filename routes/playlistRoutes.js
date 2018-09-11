const express = require('express');
const playlistsController = require('../controllers/playlistsController');
const playlistsRouter = express.Router();

playlistsRouter.route("/")
  .get(playlistsController.index)
  .post(playlistsController.create)

playlistsRouter.route("/playlistName/:playlist_name")
  .get(playlistsController.getByPlaylistName)

playlistsRouter.route("/delete/:id")
  .delete(playlistsController.destroy)

playlistsRouter.route("/user/:id")
  .get(playlistsController.getByUserId)

module.exports = playlistsRouter;
