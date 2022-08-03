import { Client } from 'discord.js';
import { PotentialMessageReaction, PotentialDiscordUser } from '../../../types/discordEvents.js';

async function onMessageReactionAdd(bot: Client, message: PotentialMessageReaction, user: PotentialDiscordUser) {

};

export default onMessageReactionAdd;