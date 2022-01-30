const express = require('express');
// const controller = require('../controllers/linearController');
const controller = require('../controllers/Linear/linearController');
const router = express.Router();

router.route("/")
.post(controller.handleWebhook)

module.exports = router;