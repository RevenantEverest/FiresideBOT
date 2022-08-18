import { Request, Response, NextFunction } from 'express';

import { Fortune } from '../../../entities/index.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities } from '../../../utils/index.js';

async function getOne(req: Request, res: Response, next: NextFunction) {
    
    const { guildId, id }: ResponseLocalsParams = res.locals.params;

    const [fortune, err] = await entities.findOne<Fortune>(Fortune, {
        where: {
            id: id,
            guild_id: guildId
        }
    });

    if(err) {
        return errors.sendResponse({ res, status: 500, err, message: "Error finding Fortune" });
    }

    if(!fortune) {
        return errors.sendResponse({ res, status: 404, message: "No Fortune found" });
    }

    return res.json({ results: fortune });
};

export default getOne;