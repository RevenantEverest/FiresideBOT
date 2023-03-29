import { Request, Response, NextFunction } from 'express';
import { PaginatedResponse } from 'src/types/pagination.js';

import { GuildWarsEventSignup } from '../../../entities/index.js';

import { errors, entities, pagination } from '../../../utils/index.js';

async function index(req: Request, res: Response, next: NextFunction) {

    const { limit, offset } = res.locals;
    const [eventSignups, err] = await entities.indexAndCount<GuildWarsEventSignup>(GuildWarsEventSignup, {
        limit, offset
    });

    if(err || !eventSignups) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error Finding Event Signups",
            entityReturn: eventSignups,
            missingEntityReturnMessage: "No Event Signups Returned"
        });
    }

    const response: PaginatedResponse<GuildWarsEventSignup> = pagination.paginateResponse(req, res, eventSignups);

    return res.json(response);
};

export default index;