const express = require('express');
const guildRouter = express.Router();
const guildsController = require('../../controllers/GuildControllers/guildsController');

guildRouter.route('/')
.get(guildsController.index)
.post(guildsController.create)

guildRouter.route("/check/:id")
.get(guildsController.checkForGuild)

guildRouter.route('/info/:id')
.get(guildsController.getOne)

module.exports = guildRouter;
