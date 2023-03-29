import { Request, Response, NextFunction } from 'express';

import { GuildWarsEvent, GuildWarsEventCategory,  } from '../../../types/guildwarsEvents.js';

import guildwarsEvents from '../../../resources/guildwarsEvents.json' assert { type: "json" };

async function getByEventTitle(req: Request, res: Response, next: NextFunction) {

    const { eventName } = req.params;

    const eventFilter: GuildWarsEventCategory = guildwarsEvents.filter((category) => {
        return category.events.some((event) => event.title.toLowerCase() === eventName.toLowerCase())
    })[0];

    const eventData: GuildWarsEvent = eventFilter.events.filter((event) => event.title.toLowerCase() === eventName.toLowerCase())[0];

    return res.json({ 
        results: {
            category: eventFilter.category,
            ...eventData
        }
    });
};

export default getByEventTitle;