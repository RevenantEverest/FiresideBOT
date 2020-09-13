const express = require('express');
const controller = require('../../controllers/AdminControllers/guildsController');
const router = express.Router();

router.route("/")
.get(controller.getBotGuilds)

module.exports = router;