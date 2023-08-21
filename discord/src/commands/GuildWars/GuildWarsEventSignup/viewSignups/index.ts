import { CommandDispatch, CommandFile } from '../../../../types/commands.js';
import { PaginatedEmbed } from '../../../../types/embeds.js';
import { GuildWarsEventSignUp } from '../../../../types/entities/GuildWarsEventSignUp.js';
import { ApiPaginationOptions, GetPageResponse } from '../../../../types/pagination.js';
import { HandleReturn } from '../../../../types/promises.js';

import * as api from '../../../../api/index.js';

import { IMAGE_RESOURCES } from '../../../../constants/index.js';
import { embeds, colors, dates, pagination, errors } from '../../../../utils/index.js';

async function viewSignups(dispatch: CommandDispatch, timezone: string, commandFile: CommandFile) {
    const [eventSignups, err] = await api.guildwarsEventSignups.getByDiscordId(dispatch, dispatch.author.id, {
        page: 1
    });

    if(err || !eventSignups) {
        return errors.commandApi({
            dispatch,
            commandFile,
            err,
            resource: eventSignups,
            missingResourceMessage: "No Event Signups Returned"
        });
    }

    const amountPerPage: number = 5;
    const paginatedEmbed: PaginatedEmbed = generatePaginatedEmbed(eventSignups.results);

    function generatePaginatedEmbed(events: GuildWarsEventSignUp[]): PaginatedEmbed {
        return {
            pages: embeds.generatePaginatedEmbedPages<GuildWarsEventSignUp>({
                title: `Event Signups`,
                author: {
                    name: `${dispatch.author.username} #${dispatch.author.discriminator}`,
                    iconURL: dispatch.author.avatarURL({ dynamic: true }) ?? ""
                },
                thumbnail: IMAGE_RESOURCES.GW2_LOGO,
                color: colors.guildwars,
                data: events,
                amountPerPage,
                setFieldName: (event: GuildWarsEventSignUp, index: number, startIndex: number): string => {
                    return `${(startIndex + index) + 1}. ${event.event_title}`;
                },
                setFieldValue: (event: GuildWarsEventSignUp): string => {
                    const signupTimeFormat = dates.convertToTimezoneFromUTCAndFormat(event.event_time, ["HH:mm"], timezone).time;
                    const createdAtTimeFormat = dates.convertToTimezoneFromUTCAndFormat(event.created_at, ["YYYY-MM-DD HH:mm:ss"], timezone, {
                        dateFormat: "MMMM Do, YYYY"
                    });
                    return (
                        `**Signed Up For:** ${signupTimeFormat} ${timezone.toUpperCase()}\n` + 
                        `**Added At:** ${createdAtTimeFormat.date}\n` +
                        `**ID:** ${event.id}`
                    );
                }
            })
        };
    };

    const partialOptions = pagination.generateBasicPaginationOptions<GuildWarsEventSignUp>(eventSignups);
    const paginationOptions: ApiPaginationOptions<GuildWarsEventSignUp> = {
        ...partialOptions,
        amountPerPage,
        getPage: async (page: number, data: GuildWarsEventSignUp[]): HandleReturn<GetPageResponse<GuildWarsEventSignUp>> => {
            const [paginatedRes, err] = await api.guildwarsEventSignups.getByDiscordId(dispatch, dispatch.author.id, {
                page
            });

            if(err) {
                return [undefined, err];
            }

            if(!paginatedRes) {
                return [undefined, new Error("No Guild Wars Events Found")];
            }

            const getPageRes = pagination.formatGetPageResponse({ page, data, paginatedRes, generatePaginatedEmbed });

            return [getPageRes, undefined];
        }
    };

    return embeds.pagination<GuildWarsEventSignUp>(dispatch, paginatedEmbed, paginationOptions);
};

export default viewSignups;