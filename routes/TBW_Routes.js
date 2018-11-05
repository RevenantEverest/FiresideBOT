//Twitch Banned Words
const express = require('express');
const TBW_Controller = require('../controllers/TBW_Controller');
const TBW_Router = express.Router();

TBW_Router.route('/')
.get(TBW_Controller.index)
.post(TBW_Controller.create)
.put(TBW_Controller.update)

TBW_Router.route('/TBW_id/:id')
.get(TBW_Controller.getOne)
.delete(TBW_Controller.delete)

TBW_Router.route('/banned_word/:banned_word')
.get(TBW_Controller.getByBannedWord)

TBW_Router.route('/channel/:channel')
.get(TBW_Controller.getByChannelName)

module.exports = TBW_Router;
