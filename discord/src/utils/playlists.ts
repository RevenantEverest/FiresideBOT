import { GuildResolvable, MessageEmbedAuthor, Role, UserResolvable } from 'discord.js';

import { CommandDispatch, CommandFile } from '../types/commands.js';
import { ApiPaginatedResponse,  } from '../types/api.js';
import { GuildPlaylist } from '../types/entities/GuildPlaylist.js';
import { GuildPlaylistRole } from '../types/entities/GuildPlaylistRole.js';
import { GuildSong } from '../types/entities/GuildSong.js';
import { UserPlaylist } from '../types/entities/UserPlaylist.js';
import { UserSong } from '../types/entities/UserSong.js';
import { PaginatedEmbed } from '../types/embeds.js';
import { HandleReturn } from '../types/promises.js';
import { ApiPaginationOptions, GetPageResponse } from '../types/pagination.js';

import * as api from '../api/index.js';

import { IMAGE_RESOURCES, EMOJIS } from '../constants/index.js';
import * as dates from './dates.js';
import * as colors from './colors.js';
import * as embeds from './embeds.js';
import * as pagination from './pagination.js';
import * as errors from './errors.js';

type Playlist = UserPlaylist | GuildPlaylist;
type Song = UserSong | GuildSong;

interface PlaylistsEmbedParams {
    dispatch: CommandDispatch,
    commandFile: CommandFile,
    playlists: ApiPaginatedResponse<Playlist>,
    requestId: UserResolvable | GuildResolvable, 
    setAuthor: () => MessageEmbedAuthor,
    isServerPlaylist?: boolean
};

interface SinglePlaylistEmbedParams {
    dispatch: CommandDispatch,
    commandFile: CommandFile,
    playlist: Playlist,
    songs: ApiPaginatedResponse<Song>,
    setDescription: () => string,
    setAuthor: () => MessageEmbedAuthor
    isServerPlaylist?: boolean
};

interface SendPlaylistRolesEmbed {
    dispatch: CommandDispatch,
    commandFile: CommandFile,
    playlist: GuildPlaylist,
    roles: ApiPaginatedResponse<GuildPlaylistRole>
};

function isUserPlaylist(playlist: Playlist): playlist is UserPlaylist {
    return (playlist as UserPlaylist).discord_id !== undefined;
};

/**
 * Generates and sends a paginated embed for either UserPlaylists or GuildPlaylists
 * @param PlaylistsEmbedParams
 * @returns 
 */
export function sendPlaylistsEmbed({ dispatch, commandFile, playlists, requestId, setAuthor, isServerPlaylist }: PlaylistsEmbedParams) {
    const amountPerPage: number = 5;
    const paginatedEmbed: PaginatedEmbed = generatePaginatedEmbed(playlists.results);

    function generatePaginatedEmbed(playlists: Playlist[]): PaginatedEmbed {
        const playlistDurations = playlists.map(playlist => playlist.duration);
        const overallDuration = playlistDurations.reduce((a, b) => a + b, 0);

        return {
            pages: embeds.generatePaginatedEmbedPages<Playlist>({
                title: `**Overall Length of Playlists:**`,
                description: `${dates.parseSeconds(overallDuration)}\n\u200b`,
                author: setAuthor(),
                thumbnail: IMAGE_RESOURCES.PLAYLIST_ICON,
                color: colors.steelPink,
                data: playlists,
                amountPerPage,
                setFieldName(playlist: Playlist, index: number, startIndex: number) {
                    const duration = dates.parseSeconds(playlist.duration);
                    const isPrivatePlaylist = isUserPlaylist(playlist) && !playlist.is_public;
                    return `${(startIndex + index) + 1}. ${playlist.name} (${duration}) ${isPrivatePlaylist ? EMOJIS.LOCKED : ""}`
                },
                setFieldValue(playlist: Playlist) {
                    return `${playlist.songCount} songs`;
                }
            })
        };
    };

    const partialOptions = pagination.generateBasicPaginationOptions<Playlist>(playlists);
    const paginatedOptions: ApiPaginationOptions<Playlist> = {
        ...partialOptions,
        amountPerPage,
        getPage: async (page: number, data: Playlist[]): HandleReturn<GetPageResponse<Playlist>> => {
            const userPlaylistRequest = api.userPlaylists.getByDiscordId(dispatch, (requestId as UserResolvable), { page });
            const guildPlaylistRequest = api.guildPlaylists.getByGuildId(dispatch, (requestId as GuildResolvable), { page });

            const [paginatedRes, err] = isServerPlaylist ? await guildPlaylistRequest : await userPlaylistRequest;

            if(err) {
                errors.command({ dispatch, err, errMessage: err.message, commandName: commandFile.displayName });
                return [undefined, err];
            }

            if(!paginatedRes) {
                return [undefined, new Error("No Playlists Found")];
            }

            const getPageRes = pagination.formatGetPageResponse({ page, data, paginatedRes, generatePaginatedEmbed });

            return [getPageRes, undefined];
        }
    };

    return embeds.pagination<Playlist>(dispatch, paginatedEmbed, paginatedOptions);
};

/**
 * Generates and sends a paginated embed for UserPlaylists and GuildPlaylists songs
 * @param SinglePlaylistEmbedParams 
 * @returns 
 */
export function sendSinglePlaylistEmbed({ dispatch, commandFile, playlist, songs, setDescription, setAuthor, isServerPlaylist }: SinglePlaylistEmbedParams) {
    const amountPerPage: number = 5;
    const paginatedEmbed: PaginatedEmbed = generatePaginatedEmbed(songs.results);

    function generatePaginatedEmbed(playlistSongs: Song[]): PaginatedEmbed {
        let playlistDuration = "";

        if(playlist?.duration && playlist.duration > 0) {
            playlistDuration = `(${dates.parseSeconds(playlist.duration)})`;
        }

        return {
            pages: embeds.generatePaginatedEmbedPages<Song>({
                title: `**${playlist?.name} ${playlistDuration}**`,
                description: setDescription(),
                author: setAuthor(),
                thumbnail: IMAGE_RESOURCES.PLAYLIST_ICON,
                color: colors.steelPink,
                data: playlistSongs, 
                amountPerPage, 
                setFieldName: (song: Song, index: number, startIndex: number): string => {
                    return `${(startIndex + index) + 1}. ${song.title}`;
                }, 
                setFieldValue: (song: Song): string => {
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

    const partialOptions = pagination.generateBasicPaginationOptions<Song>(songs);  
    const paginationOptions: ApiPaginationOptions<Song> = {
        ...partialOptions,
        amountPerPage,
        getPage: async (page: number, data: Song[]): HandleReturn<GetPageResponse<Song>> => {
            const userSongsRequest = api.userSongs.getByPlaylistId(dispatch, (playlist as UserPlaylist), { page });
            const guildSongsRequest = api.guildSongs.getByPlaylistId(dispatch, (playlist as GuildPlaylist), { page });

            const [paginatedRes, err] = isServerPlaylist ? await guildSongsRequest : await userSongsRequest;
    
            if(err) {
                errors.command({ dispatch, err, errMessage: err.message, commandName: commandFile.displayName });
                return [undefined, err];
            }
        
            if(!paginatedRes) {
                return [undefined, new Error("No Songs Found")];
            }

            const getPageRes = pagination.formatGetPageResponse({ page, data, paginatedRes, generatePaginatedEmbed });

            return [getPageRes, undefined];
        }
    };

    return embeds.pagination<Song>(dispatch, paginatedEmbed, paginationOptions);
};

/**
 * 
 * @param SendPlaylistRolesEmbed 
 * @returns 
 */
export function sendPlaylistRolesEmbed({ dispatch, commandFile, playlist, roles }: SendPlaylistRolesEmbed) {
    const amountPerPage: number = 5;
    const paginatedEmbed: PaginatedEmbed = generatePaginatedEmbed(roles.results);

    function generatePaginatedEmbed(playlistRoles: GuildPlaylistRole[]): PaginatedEmbed {
        return {
            pages: embeds.generatePaginatedEmbedPages<GuildPlaylistRole>({
                title: `**${playlist.name}**\n\u200b`,
                description: ``,
                author: {
                    iconURL: dispatch.guild.iconURL({ dynamic: true }) ?? "",
                    name: `${dispatch.guild.name} - Server Playlists Roles`
                },
                thumbnail: IMAGE_RESOURCES.PLAYLIST_ICON,
                color: colors.steelPink,
                data: playlistRoles, 
                amountPerPage, 
                setFieldName: (role: GuildPlaylistRole, index: number, startIndex: number): string => {
                    const guildRole = dispatch.guild.roles.resolve(role.role_id);
                    return `${(startIndex + index) + 1}. @${guildRole?.name ?? "[deleted role]"}`;
                }, 
                setFieldValue: (role: GuildPlaylistRole): string => {
                    const createdAt = dates.format(role.created_at, {
                        dateFormat: "MMMM D, YYYY"
                    });
                    return(
                        `**Added At:** ${createdAt.date}\n` +
                        `**ID:** ${role.id}`
                    );
                }
            })
        };
    };

    const partialOptions = pagination.generateBasicPaginationOptions<GuildPlaylistRole>(roles);  
    const paginationOptions: ApiPaginationOptions<GuildPlaylistRole> = {
        ...partialOptions,
        amountPerPage,
        getPage: async (page: number, data: GuildPlaylistRole[]): HandleReturn<GetPageResponse<GuildPlaylistRole>> => {
            const [paginatedRes, err] = await api.guildPlaylistRoles.getByPlaylistId(dispatch, playlist.id, { page });
    
            if(err) {
                errors.command({ dispatch, err, errMessage: err.message, commandName: commandFile.displayName });
                return [undefined, err];
            }
        
            if(!paginatedRes) {
                return [undefined, new Error("No Roles Found")];
            }

            const getPageRes = pagination.formatGetPageResponse({ page, data, paginatedRes, generatePaginatedEmbed });

            return [getPageRes, undefined];
        }
    };

    return embeds.pagination<GuildPlaylistRole>(dispatch, paginatedEmbed, paginationOptions);
};