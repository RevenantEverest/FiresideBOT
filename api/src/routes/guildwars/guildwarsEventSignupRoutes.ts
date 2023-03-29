import express from 'express';
import { guildwarsEventSignupsController } from '../../controllers/guildwars/index.js';
import { extractPaginationParams, validation } from '../../middleware/index.js';

const router = express.Router();

router.route("/")
.get(extractPaginationParams, guildwarsEventSignupsController.index)
.post(guildwarsEventSignupsController.create)

router.route("/id/:id")
.get(validation.id, guildwarsEventSignupsController.getOne)
.delete(validation.id, guildwarsEventSignupsController.destroy)

router.route("/discord_id/:discordId")
.get(validation.discordId, guildwarsEventSignupsController.getByDiscordId)

router.route("/name/:eventName")
.get(guildwarsEventSignupsController.getByEventTitle)

router.route("/name/:eventName/discord_id/:discordId")
.get(validation.discordId, guildwarsEventSignupsController.getByEventTitleAndDiscordId)

export default router;