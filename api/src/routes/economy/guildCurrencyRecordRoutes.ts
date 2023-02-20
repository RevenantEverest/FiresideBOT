import express from 'express';
import { guildCurrencyRecordsController } from '../../controllers/economy/index.js';
import { extractPaginationParams, permissions, validation } from '../../middleware/index.js';

const router = express.Router();

router.route("/")
.get(extractPaginationParams, guildCurrencyRecordsController.index)

router.route("/guild_id/:guildId")
.get(extractPaginationParams, validation.guildId, permissions.isGuildAdmin, guildCurrencyRecordsController.getByGuildId)
.post(validation.guildId, permissions.isGuildMember, guildCurrencyRecordsController.create)
// .put(validation.)

router.route("/guild_id/:guildId/discord_id/:discordId")
.get(validation.guildId, validation.discordId, permissions.isGuildMember, guildCurrencyRecordsController.getByGuildIdDiscordId)

export default router;