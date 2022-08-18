import { Request, Response, NextFunction } from 'express';
import { FindOneOptions } from 'typeorm';

import { Fortune } from '../../../entities/index.js';
import { AuthenticatedResponseLocals, ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities, pagination } from '../../../utils/index.js';

async function getByGuildId(req: Request, res: Response, next: NextFunction) {
    
    const { guildId }: ResponseLocalsParams = res.locals.params;
    const { limit, offset } = res.locals as AuthenticatedResponseLocals;

    const findOptions: FindOneOptions<Fortune> = {
        where: {
            guild_id: guildId
        }
    };

    const [fortunes, err] = await entities.findAndCount<Fortune>(Fortune, findOptions, {
        limit, offset
    });

    if(err) {
        return errors.sendResponse({ res, status: 500, err, message: "Error finding Fortunes" });
    }

    if(!fortunes) {
        return errors.sendResponse({ res, status: 404, message: "No Fortunes Found" });
    }

    const response = pagination.paginateResponse<Fortune>(req, res, fortunes);

    return res.json(response);
};

export default getByGuildId;