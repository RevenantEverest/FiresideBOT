import Discord, { MessageReaction, User, Message } from 'discord.js';
import { PaginatedEmbed } from '../types/embeds.js';
import { ApiPaginationOptions, GetPageResponse } from '../types/pagination.js';
import { Server } from '../types/server.js';
import { CommandDispatch } from '../types/commands.js';

import * as api from '../api/index.js';

import { DEFAULTS, EMOJIS } from '../constants/index.js';
import * as embeds from './embeds.js';
import * as common from './common.js';
import * as errors from './errors.js';

interface ShouldRequestApiPageParams<T> {
    index: number,
    apiRequestInterval: number,
    paginatedEmbed: PaginatedEmbed,
    paginationOptions: ApiPaginationOptions<T>
}
interface GetContentLengthParams<T> {
    paginatedEmbed: PaginatedEmbed,
    paginationOptions?: ApiPaginationOptions<T>,
};

interface ApiNavigationReturn<T> {
    paginationOptions: ApiPaginationOptions<T>,
    paginatedEmbed: PaginatedEmbed
};

function getPageToRequest(index: number, amountPerPage: number): number {
    return Math.ceil(Math.ceil((index + 1) * amountPerPage) / DEFAULTS.API_PAGINATION.LIMIT);
};

function shouldRequestApiPage<T>({ index, apiRequestInterval, paginatedEmbed, paginationOptions }: ShouldRequestApiPageParams<T>): boolean {
    const contentLength = getContentLength({ paginatedEmbed, paginationOptions })
    return index === contentLength ? true : (index % apiRequestInterval) - 1 === 0;
};

async function apiNavigation<T>(pageToRequest: number, paginationOptions: ApiPaginationOptions<T>): Promise<ApiNavigationReturn<T> | null>  {
    const [res, err] = await paginationOptions.getPage(pageToRequest, paginationOptions.data);

    if(!res || err) {
        return null;
    }

    const requestedPages = paginationOptions.requestedPages ?? [];
    requestedPages.push(pageToRequest);

    return {
        paginatedEmbed: res.paginatedEmbed,
        paginationOptions: {
            ...setUpdatedPaginationOptions<T>(res, paginationOptions),
            requestedPages
        }
    };
};

function setUpdatedPaginationOptions<T>(getPageRes: GetPageResponse<T>, paginationOptions: ApiPaginationOptions<T>): ApiPaginationOptions<T> {
    const { hasMore, data } = getPageRes;

    return {
        ...paginationOptions,
        hasMore, 
        data
    };
};

function getContentLength<T>({ paginatedEmbed, paginationOptions }: GetContentLengthParams<T>): number {
    const maxApiPaginationPages = Math.ceil(((paginationOptions?.count ?? 0) / (paginationOptions?.amountPerPage ?? 0)) - 1);
    const contentLength = paginatedEmbed.pages.length - 1;
    
    if(paginationOptions) {
        return maxApiPaginationPages;
    }

    return contentLength;
};

/**
 * Reacts to a message with navigation emojis and handles paginated embed content
 * @param message Message
 * @param index number
 * @param paginatedEmbed PaginatedEmbed
 * @param paginationOptions ApiPaginationOptions<T>
 */
export async function createReactionNavigator<T>(message: Message, index: number, paginatedEmbed: PaginatedEmbed, paginationOptions?: ApiPaginationOptions<T>) {
    const navigatorEmojis = {
        next: EMOJIS.NEXT,
        stop: EMOJIS.STOP,
        prev: EMOJIS.PREV
    };

    await message.react(navigatorEmojis.prev);
    await message.react(navigatorEmojis.stop);
    await message.react(navigatorEmojis.next);

    const collector = new Discord.ReactionCollector(message, { 
        time: (paginatedEmbed.time ?? DEFAULTS.PAGINATED_EMBED_TIME) * 60000,
        dispose: true
    });

    collector.on("remove", handleReaction)
    collector.on("collect", handleReaction);   
    collector.on("end", async () => {
        message.reactions.removeAll();
    });

    async function handleReaction(reaction: MessageReaction, user: User) {
        if(user.bot) return;

        const amountPerPage = paginationOptions?.amountPerPage ?? 0;
        const requestedPages = paginationOptions?.requestedPages ?? [];
        
        const apiRequestInterval = Math.ceil(DEFAULTS.API_PAGINATION.LIMIT / amountPerPage);

        switch(reaction.emoji.name) {
            case navigatorEmojis.next:

                const nextPage = getPageToRequest(index + 1, amountPerPage);
                const hasRequestedNextPage = requestedPages.includes(nextPage) || nextPage === 1;

                if(paginationOptions && shouldRequestApiPage({ index, apiRequestInterval, paginatedEmbed, paginationOptions }) && !hasRequestedNextPage) {
                    const apiRes = await apiNavigation<T>(nextPage, paginationOptions);

                    if(!apiRes) {
                        return collector.stop();
                    }

                    paginatedEmbed = apiRes.paginatedEmbed;
                    paginationOptions = apiRes.paginationOptions;
                }

                index === getContentLength({ paginatedEmbed, paginationOptions }) ? index = 0 : index++;
                break;
            case navigatorEmojis.prev:

                const adjustedIndex = index === 0 ? getContentLength({ paginatedEmbed, paginationOptions }) : index - 1;
                const prevPage = getPageToRequest(adjustedIndex, amountPerPage);
                const hasRequestedPrevPage = requestedPages.includes(prevPage) || prevPage === 1;

                if(paginationOptions && shouldRequestApiPage({ index: adjustedIndex, apiRequestInterval, paginatedEmbed, paginationOptions }) && !hasRequestedPrevPage) {
                    const apiRes = await apiNavigation<T>(prevPage, paginationOptions);

                    if(!apiRes) {
                        return collector.stop();
                    }

                    paginatedEmbed = apiRes.paginatedEmbed;
                    paginationOptions = apiRes.paginationOptions;
                }

                index = adjustedIndex;
                break;
            case navigatorEmojis.stop: 
                return collector.stop();
            default:
                return;
        };

        const embed = embeds.generateEmbed(index, paginatedEmbed, paginationOptions);
        reaction.message.edit({
            content: paginatedEmbed.flavorText,
            embeds: [embed]
        });
    };
};

/**
 * Reacts to message with a heart and adds current song info as a song to LikedPlaylist
 * @param server Server
 * @param dispatch CommandDispatch
 * @param message Message
 */
export async function likeSong(server: Server, dispatch: CommandDispatch, message: Message) {
    const heart = EMOJIS.HEARTS[common.RNG(EMOJIS.HEARTS.length)];
    await message.react(heart);

    const collector = new Discord.ReactionCollector(message, { 
        time: (server.queue.currentSongInfo?.duration ?? 0) * 60000,
        dispose: true
    });

    collector.on("collect", handleReaction);
    collector.on("end", async () => {
        message.reactions.removeAll();
    });

    async function handleReaction(reaction: MessageReaction, user: User) {
        if(user.bot) return;
        if(heart !== reaction.emoji.name) return;

        const [likedSongsPlaylist,  getPlaylistErr] = await api.userPlaylists.getByDiscordIdAndNameOrCreate(dispatch, user.id, DEFAULTS.DEFAULT_PLAYLISTS.LIKED_SONGS, true);

        if(getPlaylistErr) {
            if(getPlaylistErr.response && getPlaylistErr.response.status !== 500) {
                const responseData = getPlaylistErr.response.data;
                return dispatch.channel.send(responseData.message);
            }
            return errors.utility({ dispatch, err: getPlaylistErr, errMessage: getPlaylistErr.message, resourceName: "LikeSong" });
        }

        if(!likedSongsPlaylist) {
            return errors.utility({ dispatch, errMessage: "No LikedSongs Playlist", resourceName: "LikeSong" });
        }

        const currentSong = server.queue.currentSongInfo;

        const [likedSong, err] = await api.userSongs.create(dispatch, {
            playlist_id: likedSongsPlaylist.id,
            request:  `${currentSong?.title} ${currentSong?.author}`
        });

        if(err) {
            if(err.response && err.response.status !== 500) {
                const responseData = err.response.data;
                return dispatch.channel.send(responseData.message);
            }
            return errors.utility({ dispatch, err, errMessage: err.message, resourceName: "LikeSong" });
        }

        if(!likedSong) {
            return errors.utility({ dispatch, errMessage: "Liked Song Not Returned", resourceName: "LikeSong" });
        }

        return dispatch.channel.send(`**${likedSong.title}** added to LikedSongs with **ID: ${likedSong.id}**`);
    };
};