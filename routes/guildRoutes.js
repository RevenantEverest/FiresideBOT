const express = require('express');
const guildRouter = express.Router();
const guildsController = require('../controllers/guildsController');

guildRouter.route('/')
.get(guildsController.index)
.post(guildsController.create)

guildRouter.route('/check/:id')
.get(guildsController.checkIfExists)
.delete(guildsController.delete)

guildRouter.route('/info/:id')
.get(guildsController.getOne)

guildRouter.route('/settings')
.post(guildsController.setDefaultSettings)
.put(guildsController.updateSettings)

guildRouter.route('/settings/:id')
.get(guildsController.getSettings)

module.exports = guildRouter;
