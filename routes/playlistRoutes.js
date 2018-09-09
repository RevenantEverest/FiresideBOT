const express = require('express');
const playlistsController = require('../controllers/playlistsController');
const playlistsRouter = express.Router();

playlistsRouter.route("/")
  .get(playlistsController.index)
  .post(playlistsController.create)

module.exports = playlistsRouter;
