import { Request, Response, NextFunction } from 'express';
import { FindOneOptions } from 'typeorm';

import { GuildWarsEventSignup } from '../../../entities/index.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities, pagination } from '../../../utils/index.js';

async function getByEventTitleAndEventTime(req: Request, res: Response, next: NextFunction) {

    const { limit, offset } = res.locals;
    const { eventName, eventTime } = req.params;

    const findOptions: FindOneOptions<GuildWarsEventSignup> = {
        where: {
            event_title: eventName,
            event_time: eventTime
        }
    };
    const [eventSignups, err] = await entities.findAndCount<GuildWarsEventSignup>(GuildWarsEventSignup, findOptions, {
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

    const response = pagination.paginateResponse<GuildWarsEventSignup>(req, res, eventSignups);

    return res.json(response);
};

export default getByEventTitleAndEventTime;