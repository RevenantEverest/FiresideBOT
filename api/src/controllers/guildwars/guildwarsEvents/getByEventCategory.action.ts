import { Request, Response, NextFunction } from 'express';

import { GuildWarsEventCategory,  } from '../../../types/guildwarsEvents.js';

import guildwarsEvents from '../../../resources/guildwarsEvents.json' assert { type: "json" };

async function getByEventCategory(req: Request, res: Response, next: NextFunction) {
    const { categoryName } = req.params;

    const eventFilter: GuildWarsEventCategory = guildwarsEvents.filter((category) => category.category.toLowerCase() === categoryName.toLowerCase())[0];

    return res.json({ 
        results: {
            ...eventFilter
        }
    });
};

export default getByEventCategory;