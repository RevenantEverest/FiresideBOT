import { GuildResolvable } from 'discord.js';
import { GuildSettings } from '../types/entities/GuildSettings.js';
import config from '../config/index.js';

export const VOLUME = 50;

export async function generateDefaultServer(guildId: GuildResolvable, guildSettings: GuildSettings) {
    config.servers.push({
        id: guildId,
        premium: false,
        queue: {
            playing: false,
            info: [],
            currentSongEmbed: null,
            genres: [],
            options: {
                volume: guildSettings.volume ? guildSettings.volume : VOLUME,
                loop: false,
                recommendations: false,
                voteToSkip: false
            }
        }
    });
};