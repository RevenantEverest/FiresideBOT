const express = require('express');
const CC = require('../controllers/discordCurrencyController');
const currencyRouter = express.Router();

currencyRouter.route("/")
.get(CC.index)
.post(CC.create)

currencyRouter.route("/discord_id/:id")
.get(CC.getByDiscordId)

currencyRouter.route("/guild_id/:id")
.get(CC.getByGuildId)

currencyRouter.route("/id/:id")
.get(CC.getOne)
.delete(CC.delete)

module.exports = currencyRouter;
