import Discord, { MessageEmbed } from 'discord.js';

import { GuildMessage } from '../types/message.js';
import { Server } from '../types/server.js';

import { URLS } from '../constants/index.js';
import * as colors from './colors.js';
import * as dates from './dates.js';

export function createCurrentSongEmbed(message: GuildMessage, server: Server) {
    const currentSong = server.queue.info[0];
    const embed = new Discord.MessageEmbed({
        color: colors.songEmbed,
        title: "**CURRENT SONG**",
        thumbnail: {
            url: currentSong.thumbnail_url
        },
        fields: [
            { name: currentSong.title, value: currentSong.author },
            { name: "Link", value: URLS.YOUTUBE_VIDEO + currentSong.videoId + `\nRequested By: ${currentSong.requestedBy}` },
        ],
        footer: {
            text: `Length ${dates.parseSeconds(currentSong.duration)}`
        }
    });

    server.queue.currentSongEmbed = embed;
    message.channel.send({ embeds: [embed] });
};

export function createPaginatedEmbed(message: GuildMessage, embeds: MessageEmbed[], options: Object) {

    const index = 0;
    // const embed = 
};