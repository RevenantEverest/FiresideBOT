import { GuildResolvable } from 'discord.js';
import { GuildSettings } from '../types/entities/GuildSettings.js';
import config from '../config/index.js';

export const API_PAGINATION = {
    LIMIT: 10
};
export const PAGINATED_EMBED_TIME = 5;
export const VOLUME = 50;
export const DEFAULT_PLAYLISTS = {
    LIKED_SONGS: "LikedSongs"
};

export function generateDefaultServer(guildId: GuildResolvable, guildSettings: GuildSettings) {
    config.servers.push({
        id: guildId,
        premium: false,
        queue: {
            playing: false,
            isPaused: false,
            info: [],
            currentSongEmbed: null,
            currentSongInfo: null,
            genres: [],
            options: {
                volume: guildSettings.volume ? guildSettings.volume : VOLUME,
                loop: false,
                recommendations: false,
                voteToSkip: false
            },
            connection: null,
            resource: null,
            player: null,
            disconnectTimer: null,
            audioSourcePackage: {
                lastSwitched: Date.now(),
                timesSwitched: 0,
                packageIndex: 0
            }
        }
    });
};

export const FORTUNES: string[] = [
    "Yes",
    "No",
    "Maybe",
    "If you believe hard enough",
    "Try asking again",
    "Sure",
    "Fair Enough",
    "Please stop",
    "Incorrect",
    "You got it",
    "Mhm",
    "這都是中文的。當然"
];