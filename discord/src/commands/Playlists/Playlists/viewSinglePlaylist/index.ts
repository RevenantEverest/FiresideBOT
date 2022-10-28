import { Client } from 'discord.js';
import { CommandDispatch } from '../../../../types/commands.js';
import { UserSong } from '../../../../types/entities/UserSong.js';
import { PaginatedEmbed } from '../../../../types/embeds.js';
import { HandleReturn } from '../../../../types/promises.js';
import { ApiPaginationOptions, GetPageResponse } from '../../../../types/pagination.js';

import * as api from '../../../../api/index.js';
import { IMAGE_RESOURCES } from '../../../../constants/index.js';
import { colors, embeds, pagination, dates, errors } from '../../../../utils/index.js';

async function viewSinglePlaylist(bot: Client, dispatch: CommandDispatch, discordId: string, playlistName: string) {
    const [userPlaylist, err] = await api.userPlaylists.getByDiscordIdAndName(dispatch, discordId, playlistName);

    if(err) {
        if(err.response && err.response.status !== 500) {
            const responseData = err.response.data;
            return dispatch.reply(responseData.message);
        }
        
        return errors.command({ bot, dispatch, err, errMessage: err.message, commandName: "" });
    }

    if(!userPlaylist) {
        return dispatch.reply("No Playlist found");
    }

    const [playlistSongs, getSongsErr] = await api.userSongs.getByPlaylistId(dispatch, userPlaylist, {
        page: 1
    });

    if(getSongsErr) {
        return errors.command({ 
            bot, 
            dispatch, 
            err: getSongsErr, 
            errMessage: getSongsErr.message, 
            commandName: "" 
        });
    }

    if(!playlistSongs) {
        return dispatch.reply("No Playlist Songs found");
    }

    const amountPerPage: number = 5;
    const paginatedEmbed: PaginatedEmbed = generatePaginatedEmbed(playlistSongs.results);

    function generatePaginatedEmbed(playlistSongs: UserSong[]): PaginatedEmbed {
        return {
            pages: embeds.generatePaginatedEmbedPages<UserSong>({
                title: `**${userPlaylist?.name}**`,
                description: `Public\n\u200b`,
                author: {
                    iconURL: dispatch.author.avatarURL({ dynamic: true }) ?? "",
                    name: `${dispatch.author.username} #${dispatch.author.discriminator}`
                },
                thumbnail: IMAGE_RESOURCES.PLAYLIST_ICON,
                color: colors.steelPink,
                data: playlistSongs, 
                amountPerPage, 
                setFieldName: (song: UserSong, index: number, startIndex: number): string => {
                    return `${(startIndex + index) + 1}. ${song.title}`;
                }, 
                setFieldValue: (song: UserSong): string => {
                    const createdAt = dates.format(song.created_at, {
                        dateFormat: "MMMM D, YYYY"
                    });
                    return(
                        `**Author:** ${song.author}\n` +
                        `**Duration:** ${dates.parseSeconds(song.duration)}\n` +
                        `**Added At:** ${createdAt.date}\n` +
                        `**ID:** ${song.id}`
                    );
                }
            })
        };
    };

    const partialOptions = pagination.generateBasicPagiationOptions<UserSong>(playlistSongs);  
    const paginationOptions: ApiPaginationOptions<UserSong> = {
        ...partialOptions,
        amountPerPage,
        getPage: async (page: number, data: UserSong[]): HandleReturn<GetPageResponse<UserSong>> => {
            const [paginatedRes, err] = await api.userSongs.getByPlaylistId(dispatch, userPlaylist, {
                page
            });
    
            if(err) {
                errors.command({ bot, dispatch, err, errMessage: err.message, commandName: "Playlists" });
                return [undefined, err];
            }
        
            if(!paginatedRes) {
                return [undefined, new Error("No Songs Found")];
            }

            const getPageRes = pagination.formatGetPageResponse({ page, data, paginatedRes, generatePaginatedEmbed });

            return [getPageRes, undefined];
        }
    };

    return embeds.pagination<UserSong>(dispatch, paginatedEmbed, paginationOptions);
};

export default viewSinglePlaylist;