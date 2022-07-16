import { CommandInteraction } from 'discord.js';

export interface GuildInteraction extends CommandInteraction {
    guildId: string
}