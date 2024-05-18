import express from 'express';
import { guildCurrencyRecordsController } from '@@controllers/economy/index.js';
import { extractPaginationParams, permissions, validation } from '@@middleware/index.js';

const router = express.Router();

router.route("/")
.get(extractPaginationParams, guildCurrencyRecordsController.index)

router.route("/guild_id/:guildId")
.get(extractPaginationParams, validation.guildId, permissions.isGuildAdmin, guildCurrencyRecordsController.getByGuildId)

router.route("/guild_id/:guildId/discord_id/:discordId")
.get(validation.guildId, validation.discordId, permissions.isGuildMember, guildCurrencyRecordsController.getByGuildIdDiscordId)
.put(validation.guildId, validation.discordId, permissions.isGuildMember, guildCurrencyRecordsController.update)
.post(validation.guildId, validation.discordId, permissions.isGuildMember, guildCurrencyRecordsController.create)

export default router;