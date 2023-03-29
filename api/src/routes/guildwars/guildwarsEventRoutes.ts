import express from 'express';
import { guildwarsEventsController } from '../../controllers/guildwars/index.js';
import { extractPaginationParams } from '../../middleware/index.js';

const router = express.Router();

router.route("/")
.get(extractPaginationParams, guildwarsEventsController.index)

router.route("/name/:eventName")
.get(guildwarsEventsController.getByEventTitle)

router.route("/category/:categoryName")
.get(guildwarsEventsController.getByEventCategory)

export default router;