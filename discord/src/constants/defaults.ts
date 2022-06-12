import { GuildResolvable } from 'discord.js';
import config from '../config/index.js';

export const VOLUME = 50;

export async function generateDefaultServer(guildId: GuildResolvable) {
    config.servers.push({
        id: guildId,
        premium: false,
        queue: {
            playing: false,
            info: [],
            currentSongEmbed: [],
            genres: [],
            options: {
                volume: VOLUME,
                loop: false,
                recommendations: false,
                voteToSkip: false
            }
        }
    });
};