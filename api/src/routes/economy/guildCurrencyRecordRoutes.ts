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
.put(validation.guildId, validation.discordId, permissions.isGuildMember, guildCurrencyRecordsController.update)

export default router;

/*

    Update Routes:
    - User updates the currency amount from a command
        - The user should not be able to hit this endpoint and update their own currency
        - Maybe add an element into auth payload that tells api if the request came from discord
    - Guild admin gives a user a certain amount of currency

    ** Is there a situation where a user doesn't have a currency record and when trying to create one and update it it will attempt to save 2?

*/