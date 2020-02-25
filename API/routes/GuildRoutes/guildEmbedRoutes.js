const express = require('express');
const controller = require('../../controllers/GuildControllers/guildEmbedsController.js');
const router = express.Router();

router.route("/")
.post(controller.sendEmbed)

module.exports = router;