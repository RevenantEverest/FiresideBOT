const express = require('express');
const songsController = require('../controllers/songsController');
const songsRouter = express.Router();

songsRouter.route("/")
  .get(songsController.index)

songsRouter.route("/:id")
  .get(songsController.getByPlaylistId)

module.exports = songsRouter;
