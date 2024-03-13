import { Request, Response, NextFunction } from 'express';
import { PaginatedResponse } from '../../../types/pagination.js';
import { ResponseLocalsParams, ResponseLocals } from '../../../types/responseLocals.js';

import { GuildCurrencyRecord } from '../../../entities/index.js';

import { errors, entities, pagination } from '../../../utils/index.js';
import { FindOneOptions } from 'typeorm';

async function getByGuildId(req: Request, res: Response, next: NextFunction) {
    const { guildId }: ResponseLocalsParams = res.locals.params;
    const { limit, offset }: ResponseLocals = res.locals;

    const findOptions: FindOneOptions<GuildCurrencyRecord> = {
        where: {
            guild_id: guildId
        }
    };
    const [guildCurrencyRecords, err] = await entities.findAndCount<GuildCurrencyRecord>(GuildCurrencyRecord, findOptions, {
        limit, offset
    });

    if(err) {
        return errors.sendResponse({ res, status: 500, err, message: "Error Finding Guild Currency Records" });
    }

    if(!guildCurrencyRecords) {
        return errors.sendResponse({ res, status: 404, message: "No Guild Currency Records" });
    }

    const response: PaginatedResponse<GuildCurrencyRecord> = pagination.paginateResponse(req, res, guildCurrencyRecords);

    return res.json(response);
};

export default getByGuildId;