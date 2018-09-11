const express = require('express');
const songsController = require('../controllers/songsController');
const songsRouter = express.Router();

songsRouter.route("/")
  .get(songsController.index)
  .post(songsController.addSong)

songsRouter.route("/playlist/:id")
  .get(songsController.getByPlaylistId)

module.exports = songsRouter;
