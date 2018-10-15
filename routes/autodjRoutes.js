const express = require('express');
const autodjRouter = express.Router();
const autodjController = require('../controllers/autodjController');

autodjRouter.route('/')
.get(autodjController.index)
.post(autodjController.create)
.put(autodjController.update)

autodjRouter.route('/user/:id')
.get(autodjController.getByUserId)

autodjRouter.route('/redirect')
.put(autodjController.updateRedirect)

autodjRouter.route('/guild_id')
.put(autodjController.updateGuildId)

module.exports = autodjRouter;
