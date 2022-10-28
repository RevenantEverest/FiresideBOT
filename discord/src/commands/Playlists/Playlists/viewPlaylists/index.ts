import { Client } from 'discord.js';
import { CommandDispatch } from '../../../../types/commands.js';
import { UserPlaylist } from '../../../../types/entities/UserPlaylist.js';
import { PaginatedEmbed } from '../../../../types/embeds.js';
import { ApiPaginationOptions, GetPageResponse } from '../../../../types/pagination.js';
import { HandleReturn } from '../../../../types/promises.js';


import * as api from '../../../../api/index.js';
import { IMAGE_RESOURCES } from '../../../../constants/index.js';
import { colors, embeds, pagination, dates, errors } from '../../../../utils/index.js';

async function viewPlaylists(bot: Client, dispatch: CommandDispatch, discordId: string) {

    const [userPlaylists, err] = await api.userPlaylists.getByDiscordId(dispatch, discordId, {
        page: 1
    });

    if(err) {
        return errors.command({ bot, dispatch, err, errMessage: err.message, commandName: "" });
    }

    if(!userPlaylists) {
        return dispatch.reply("No Fortunes found");
    }

    const playlistOwner = await dispatch.guild.members.fetch(discordId);
    const amountPerPage: number = 5;
    const paginatedEmbed: PaginatedEmbed = generatePaginatedEmbed(userPlaylists.results);

    function generatePaginatedEmbed(playlists: UserPlaylist[]): PaginatedEmbed {
        const playlistDurations = playlists.map(playlist => playlist.duration);
        const overallDuration = playlistDurations.reduce((a, b) => a + b, 0);

        return {
            pages: embeds.generatePaginatedEmbedPages<UserPlaylist>({
                title: `**Overall Length of Playlists:**`,
                description: `${dates.parseSeconds(overallDuration)}\n\u200b`,
                author: {
                    iconURL: playlistOwner.user.avatarURL({ dynamic: true }) ?? "",
                    name: `${playlistOwner.user.username} #${playlistOwner.user.discriminator} - Playlists`
                },
                thumbnail: IMAGE_RESOURCES.PLAYLIST_ICON,
                color: colors.steelPink,
                data: playlists,
                amountPerPage,
                setFieldName(playlist: UserPlaylist, index: number, startIndex: number) {
                    return `${(startIndex + index) + 1}. ${playlist.name} (${dates.parseSeconds(playlist.duration)})`
                },
                setFieldValue(playlist: UserPlaylist) {
                    return `${playlist.songCount} songs`;
                },
            })
        };
    };

    const partialOptions = pagination.generateBasicPagiationOptions<UserPlaylist>(userPlaylists);
    const paginationOptions: ApiPaginationOptions<UserPlaylist> = {
        ...partialOptions,
        amountPerPage,
        getPage: async (page: number, data: UserPlaylist[]): HandleReturn<GetPageResponse<UserPlaylist>> => {
            const [paginatedRes, err] = await api.userPlaylists.getByDiscordId(dispatch, discordId, {
                page
            });

            if(err) {
                errors.command({ bot, dispatch, err, errMessage: err.message, commandName: "Playlists" });
                return [undefined, err];
            }

            if(!paginatedRes) {
                return [undefined, new Error("No Playlists Found")];
            }

            const getPageRes = pagination.formatGetPageResponse({ page, data, paginatedRes, generatePaginatedEmbed });

            return [getPageRes, undefined];
        }
    };

    return embeds.pagination<UserPlaylist>(dispatch, paginatedEmbed, paginationOptions);
};

export default viewPlaylists;