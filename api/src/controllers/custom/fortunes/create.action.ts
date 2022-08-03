import { Request, Response, NextFunction } from 'express';

import { Fortune } from '../../../entities/index.js';
import { AuthenticatedResponseLocals, ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities } from '../../../utils/index.js';

async function create(req: Request, res: Response, next: NextFunction) {

    const { auth } = res.locals as AuthenticatedResponseLocals;
    const { guildId }: ResponseLocalsParams = res.locals.params;
    const newFortune: string = req.body.fortune;

    const [fortune, findErr] = await entities.findOne<Fortune>(Fortune, {
        where: {
            guild_id: guildId,
            fortune: newFortune
        }
    });

    if(findErr) {
        return errors.sendResponse({ res, status: 500, err: findErr, message: "Error Checking Fortune" });
    }

    if(fortune) {
        return errors.sendResponse({ res, status: 400, message: "Fortune already exists" });
    }

    const [fortuneInsert, insertErr] = await entities.insert<Fortune>(Fortune, {
        guild_id: guildId,
        fortune: newFortune,
        created_by: auth?.discord_id
    });

    if(insertErr) {
        return errors.sendResponse({ res, status: 500, err: insertErr, message: "Error saving Fortune" });
    }

    if(!fortuneInsert) {
        return errors.sendResponse({ res, status: 500, message: "No Fortune insert return" });
    }

    return res.json({ results: fortuneInsert });
};

export default create;