import { CommandDispatch } from '../../../../types/commands.js';
import { PaginatedEmbed } from '../../../../types/embeds.js';
import { GuildWarsEvent } from '../../../../types/guildwarsEvents.js';
import { ApiPaginationOptions, GetPageResponse } from '../../../../types/pagination.js';
import { HandleReturn } from '../../../../types/promises.js';
import { ApiPaginatedResponse } from '../../../../types/api.js';

import * as api from '../../../../api/index.js';

import { IMAGE_RESOURCES } from '../../../../constants/index.js';
import { colors, embeds, pagination, errors, dates } from '../../../../utils/index.js';
import dayjs from 'dayjs';

async function viewEvents(dispatch: CommandDispatch, guildwarsEvents: ApiPaginatedResponse<GuildWarsEvent>, search: string, timezone: string) {
    const amountPerPage: number = 5;
    const paginatedEmbed: PaginatedEmbed = generatePaginatedEmbed(guildwarsEvents.results);

    function generatePaginatedEmbed(events: GuildWarsEvent[]): PaginatedEmbed {
        return {
            pages: embeds.generatePaginatedEmbedPages<GuildWarsEvent>({
                title: `Events`,
                author: {
                    name: `${dispatch.guild.name} - ${timezone.toUpperCase()}`,
                    iconURL: dispatch.guild.iconURL({ dynamic: true }) ?? ""
                },
                thumbnail: IMAGE_RESOURCES.GW2_LOGO,
                color: colors.guildwars,
                data: events,
                amountPerPage,
                setFieldName: (event: GuildWarsEvent, index: number, startIndex: number): string => {
                    return `${(startIndex + index) + 1}. ${event.category} - ${event.title}\n\u200b`;
                },
                setFieldValue: (event: GuildWarsEvent): string => {
                    const convertedTimes = event.times.map((time, index) => {
                        return dates.convertToTimezoneFromUTCAndFormat(time, ["HH:mm"], timezone, {
                            timeFormat: "HH:mm"
                        }).time;
                    }).sort();

                    const times = convertedTimes.map((time, index) => {
                        const formattedTime = dates.format(time, {
                            timestampFormat: "HH:mm",
                            timeFormat: "h:mma"
                        }).time;
                        return `**${formattedTime}**${index !== 0 && index % 4 === 0 ? "\n" : ""}`
                    });

                    let nextEvent = event.times.filter((time) => {
                        const now = dayjs();
                        const eventTime = dayjs(time, ["HH:mm"]);
                        const isBefore = now.isBefore(eventTime);

                        return isBefore;
                    });

                    return(
                        `**Next Event:** ${dates.convertToTimezoneFromUTCAndFormat(nextEvent[0], ["HH:mm"], timezone).time}\n\n` + 
                        `\u2e1e ${times.join(" **\u2e1e** ")}\n\u200b`
                    );
                }
            })
        };
    };

    const partialOptions = pagination.generateBasicPaginationOptions<GuildWarsEvent>(guildwarsEvents);
    const paginationOptions: ApiPaginationOptions<GuildWarsEvent> = {
        ...partialOptions,
        amountPerPage,
        getPage: async (page: number, data: GuildWarsEvent[]): HandleReturn<GetPageResponse<GuildWarsEvent>> => {
            const [paginatedRes, err] = await api.guildwarsEvents.search(dispatch, search, {
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

    return embeds.pagination<GuildWarsEvent>(dispatch, paginatedEmbed, paginationOptions);
};

export default viewEvents;