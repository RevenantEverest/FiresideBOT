const express = require('express');
const Topgg = require('@top-gg/sdk');
const webhook = new Topgg.Webhook(process.env.TOPGG_WEBHOOK_AUTH);
const controller = require('../controllers/topggController');
const router = express.Router();

router.post("/", webhook.listener(controller.handleWebhook));

module.exports = router;