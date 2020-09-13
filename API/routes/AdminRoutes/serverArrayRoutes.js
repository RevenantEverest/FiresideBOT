const express = require('express');
const controller = require('../../controllers/AdminControllers/serverArrayController');
const router = express.Router();

router.route("/")
.get(controller.index)

router.route("/id/:id")
.get(controller.getOne)

router.route("/guild/id/:id")
.get(controller.getByGuildId)

module.exports = router;