const express = require('express');
const router = express.Router();
const controller = require('../controllers/webhookController');

router.route('/dbl')
    .post(controller.index)

module.exports = router;