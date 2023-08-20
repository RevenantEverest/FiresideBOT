import { Client } from 'discord.js';

import * as api from '../../api/index.js';

import getEventSignups from './getEventSignups.js';

import { colors, logs } from '../../utils/index.js';

async function getUpcomingEvents(bot: Client, timestamp: string, page?: number) {
    const [events, err] = await api.guildwarsEvents.getByEventTime(timestamp, {
        page: page ?? 1
    });

    if(err || !events) {
        return logs.error({ color: colors.error, err, message: err?.message ?? "Error Fetching Upcoming Events" });
    }

    for(let i = 0; i < events.results.length; i++) {
        const event = events.results[i];
        getEventSignups(bot, event, timestamp);
    };

    if(events.next) {
        getUpcomingEvents(bot, timestamp, (page ?? 1) + 1);
    }
};

export default getUpcomingEvents;