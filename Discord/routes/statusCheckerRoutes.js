const express = require('express');
const controller = require('../controllers/statusCheckerController');
const router = express.Router();

router.route("/")
.get(controller.checkStatus)

module.exports = router;