import express from 'express';
import Topgg from '@top-gg/sdk';
import { topggController } from '../../controllers/webhooks/index.js';

import { ENV } from '../../constants/index.js';

const router = express.Router();
const webhook = new Topgg.Webhook(ENV.TOPGG_WEBHOOK_AUTH)

router.route("/")
.post(webhook.listener(topggController.handleVote));

export default router;