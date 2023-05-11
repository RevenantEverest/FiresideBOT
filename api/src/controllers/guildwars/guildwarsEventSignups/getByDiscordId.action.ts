import { Request, Response, NextFunction } from 'express';
import { PaginatedResponse } from 'src/types/pagination.js';
import { FindOneOptions } from 'typeorm';

import { GuildWarsEventSignup } from '../../../entities/index.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities, pagination } from '../../../utils/index.js';

async function getByDiscordId(req: Request, res: Response, next: NextFunction) {

    const { discordId }: ResponseLocalsParams = res.locals.params;
    const { limit, offset } = res.locals;

    const findOptions: FindOneOptions<GuildWarsEventSignup> = {
        where: {
            discord_id: discordId
        },
        order: {
            event_title: "ASC"
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

    const response: PaginatedResponse<GuildWarsEventSignup> = pagination.paginateResponse(req, res, eventSignups);

    return res.json(response);
};

export default getByDiscordId;