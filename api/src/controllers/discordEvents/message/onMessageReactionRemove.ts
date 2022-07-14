import { Client } from 'discord.js';
import { PotentialMessageReaction, PotentialDiscordUser } from '../../../types/discordEvents.js';

async function onMessageReactionRemove(bot: Client, message: PotentialMessageReaction, user: PotentialDiscordUser) {

};

export default onMessageReactionRemove;