import Discord, { Message, MessageEmbed, MessageReaction, User } from 'discord.js';

import { CommandDispatch } from '../types/commands.js';
import { Server } from '../types/server.js';
import { PaginatedEmbed } from '../types/embeds.js';
import { GuildInteraction } from '../types/interaction.js';

import { URLS, DEFAULTS } from '../constants/index.js';
import * as colors from './colors.js';
import * as dates from './dates.js';

export function createCurrentSongEmbed(dispatch: CommandDispatch, server: Server) {
    const currentSong = server.queue.info[0];
    const embed = new Discord.MessageEmbed({
        color: colors.songEmbed,
        title: "**CURRENT SONG**",
        thumbnail: {
            url: currentSong.thumbnail_url
        },
        fields: [
            { name: currentSong.title, value: currentSong.author },
            { name: "Link", value: `[Click Me](${URLS.YOUTUBE_VIDEO + currentSong.videoId}) \nRequested By: ${currentSong.requestedBy}` },
        ],
        footer: {
            text: `Length ${dates.parseSeconds(currentSong.duration)}`
        }
    });

    server.queue.currentSongEmbed = embed;
    dispatch.channel.send({ embeds: [embed] });
};

function generateEmbed(index: number, paginatedEmbed: PaginatedEmbed): MessageEmbed {
    const embed = new Discord.MessageEmbed({ color: paginatedEmbed.color });

    if(paginatedEmbed.title) {
        embed.setTitle(paginatedEmbed.title);
    }

    if(paginatedEmbed.author) {
        embed.setAuthor(paginatedEmbed.author);
    }

    if(paginatedEmbed.thumbnail) {
        embed.setThumbnail(paginatedEmbed.thumbnail);
    }

    if(paginatedEmbed.content.length > 1) {
        embed.setFooter({
            text: `Page ${index + 1}/${paginatedEmbed.content.length}`
        });
    }

    paginatedEmbed.content[index].fields?.forEach(field => embed.addField(field.name, field.value, field.inline));

    return embed;
};

async function handleReactionPagination(message: Message, index: number, paginatedEmbed: PaginatedEmbed) {
    const navigatorEmojis = {
        next: "▶️",
        stop: "⏹️",
        prev: "◀️"
    };

    await message.react(navigatorEmojis.prev);
    await message.react(navigatorEmojis.stop);
    await message.react(navigatorEmojis.next);

    const collector = new Discord.ReactionCollector(message, { 
        time: (paginatedEmbed.time ?? DEFAULTS.PAGINATED_EMBED_TIME) * 60000 
    });

    collector.on("collect", async (reaction: MessageReaction, user: User) => {
        if(user.bot) return;
        
        const contentLength = paginatedEmbed.content.length - 1;

        switch(reaction.emoji.name) {
            case navigatorEmojis.next:
                index === contentLength ? index = 0 : index++;
                break;
            case navigatorEmojis.prev:
                index === 0 ? index = contentLength : index--;
                break;
            case navigatorEmojis.stop: 
                return collector.stop();
            default:
                return;
        };

        const embed = generateEmbed(index, paginatedEmbed);
        reaction.message.edit({
            content: paginatedEmbed.flavorText,
            embeds: [embed]
        });
    });   
    
    collector.on("end", async () => {
        message.reactions.removeAll();
    });
};

export async function pagination(dispatch: CommandDispatch, paginatedEmbed: PaginatedEmbed, interaction?: GuildInteraction) {

    const index = 0;
    const embed = generateEmbed(index, paginatedEmbed);

    if(paginatedEmbed.content.length <= 1) {
        return dispatch.reply({ embeds: [embed] });
    }

    if(interaction) {
        dispatch.reply("Generating queue...");
        return dispatch.channel.send({ embeds: [embed] })
        .then((msg: Message) => handleReactionPagination(msg, index, paginatedEmbed))
        .catch((err: Error) => console.error(err));
    }

    dispatch.reply({ embeds: [embed] })
    .then((msg: Message) => handleReactionPagination(msg, index, paginatedEmbed))
    .catch((err: Error) => console.error(err));
};