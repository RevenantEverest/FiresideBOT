const express = require('express');
const controller = require('../controllers/serversArrayController');
const router = express.Router();

router.route("/")
.get(controller.index)

module.exports = router;