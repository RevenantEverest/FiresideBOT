import express from 'express';
import { guildwarsEventsController } from '../../controllers/guildwars/index.js';
import { extractPaginationParams } from '../../middleware/index.js';

const router = express.Router();

router.route("/")
.get(extractPaginationParams, guildwarsEventsController.index)

router.route("/search/:search")
.get(extractPaginationParams, guildwarsEventsController.search)

router.route("/upcoming")
.get(extractPaginationParams, guildwarsEventsController.getUpcoming)

router.route("/search/")
.get(extractPaginationParams, guildwarsEventsController.search)

router.route("/name/:eventName")
.get(guildwarsEventsController.getByEventTitle)

router.route("/category/:categoryName")
.get(guildwarsEventsController.getByEventCategory)

router.route("/time/:time")
.get(extractPaginationParams, guildwarsEventsController.getByEventTime);

export default router;