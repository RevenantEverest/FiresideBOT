import { Request, Response, NextFunction } from 'express';

import guildwarsEvents from '../../../resources/guildwarsEvents.json' assert { type: "json" };

import { pagination } from '../../../utils/index.js';

async function index(req: Request, res: Response, next: NextFunction) {

    const { limit, offset } = res.locals;
    const count = guildwarsEvents.length;
    
    const data = guildwarsEvents.slice(offset, offset + limit);

    console.log(limit, offset, data.length);

    const response = pagination.paginateResponse(req, res, [data, count]);

    return res.json(response);
};

export default index;