import { Request, Response, NextFunction } from 'express';
import dayjs from 'dayjs';

import { GuildWarsEventParse } from '../../../types/guildwarsEvents.js';

import { pagination, guildwarsEvents } from '../../../utils/index.js';

async function search(req: Request, res: Response, next: NextFunction) {

    const { limit, offset } = res.locals;

    const guildwarsEventsParse = guildwarsEvents.parse();
    let events: GuildWarsEventParse[] = [];

    for(let i = 0; i < guildwarsEventsParse.length; i++) {
        const event = guildwarsEventsParse[i];
        
        for(let x = 0; x < event.times.length; x++) {
            const eventTime = dayjs(event.times[x], "HH:mm");
            const now = dayjs();
            const stop = now.add(10, "minutes");

            const isAfter = eventTime.isAfter(now);
            const isBefore = eventTime.isBefore(stop);

            if(isAfter && isBefore) {
                events.push({
                    category: event.category,
                    title: event.title,
                    times: [event.times[x]]
                });
            }
        }
    }

    const count = events.length;
    const data = events.slice(offset, offset + limit);

    const response = pagination.paginateResponse(req, res, [data, count]);

    return res.json(response);
};

export default search;