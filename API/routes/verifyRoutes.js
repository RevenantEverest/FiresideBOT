const express = require('express');
const controller = require('../controllers/verifyController');
const router = express.Router();

router.route("/")
.post(controller.verify)

module.exports = router;