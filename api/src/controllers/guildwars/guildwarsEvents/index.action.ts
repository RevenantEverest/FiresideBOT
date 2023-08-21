import { Request, Response, NextFunction } from 'express';

import guildwarsEventsJson from '../../../resources/guildwarsEvents.json' assert { type: "json" };

import { pagination, guildwarsEvents } from '../../../utils/index.js';

async function index(req: Request, res: Response, next: NextFunction) {

    const { limit, offset } = res.locals;

    const events = guildwarsEvents.parse();

    const count = events.length;
    const data = events.slice(offset, offset + limit);

    const response = pagination.paginateResponse(req, res, [data, count]);

    return res.json(response);
};

export default index;