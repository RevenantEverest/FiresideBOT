import { Request, Response, NextFunction } from 'express';

import { pagination, guildwarsEvents } from '../../../utils/index.js';

async function getByEventTime(req: Request, res: Response, next: NextFunction) {

    const { limit, offset } = res.locals;
    const { time } = req.params;

    const events = guildwarsEvents.parse().filter((event) => event.times.includes(time));

    const count = events.length;
    const data = events.slice(offset, offset + limit);

    const response = pagination.paginateResponse(req, res, [data, count]);

    return res.json(response);
};

export default getByEventTime;