const express = require('express');
const currencyRouter = express.Router();
const CC = require('../controllers/currencyController');

currencyRouter.route("/")
.put(CC.update)

currencyRouter.route("/guild_id/:id")
.get(CC.getByGuildId)

module.exports = currencyRouter;
