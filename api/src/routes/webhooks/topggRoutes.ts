import express from 'express';
import Topgg from '@top-gg/sdk';
import { topggController } from '../../controllers/webhooks/index.js';

import { ENV } from '../../constants/index.js';

const router = express.Router();

/*
    Temporary solution for jest tests to run
*/
if(!ENV.IS_TEST) {
    const webhook = new Topgg.Webhook(ENV.TOPGG_WEBHOOK_AUTH)

    router.route("/")
    .post(webhook.listener(topggController.handleVote));
}

export default router;