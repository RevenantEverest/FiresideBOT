import { Request, Response, NextFunction } from 'express';

import { pagination, guildwarsEvents } from '../../../utils/index.js';

async function search(req: Request, res: Response, next: NextFunction) {

    const { limit, offset } = res.locals;
    const searchParams = req.params.search ?? "";

    const events = guildwarsEvents.parse().filter(event => { 
        const category = event.category.toLowerCase();
        const title = event.title.toLowerCase();
        
        return category.indexOf(searchParams.toLowerCase()) !== -1 || title.toLowerCase().indexOf(searchParams.toLowerCase()) !== -1;
    });

    const count = events.length;
    const data = events.slice(offset, offset + limit);

    const response = pagination.paginateResponse(req, res, [data, count]);

    return res.json(response);
};

export default search;