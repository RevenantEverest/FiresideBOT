const express = require('express');
const controller = require('../controllers/donatorController');
const router = express.Router();

router.route("/")
.post(controller)

module.exports = router;