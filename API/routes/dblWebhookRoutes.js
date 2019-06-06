const express = require('express');
const controller = require('../controllers/dblWebhookController');
const router = express.Router();

router.route("/")
.post(controller.handleVote)

module.exports = router;