const express = require('express');
const infoController = require('../controllers/Discord_Bot_InfoController.js');
const infoRouter = express.Router();

infoRouter.route("/users/count")
.get(infoController.getUserSize)

module.exports = infoRouter;
