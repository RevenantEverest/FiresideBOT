import { Request, Response, NextFunction } from 'express';

import { Fortune } from '../../../entities/index.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities } from '../../../utils/index.js';

async function destroy(req: Request, res: Response, next: NextFunction) {
    
    const { guildId, id }: ResponseLocalsParams = res.locals.params;

    const [fortune, findErr] = await entities.findOne<Fortune>(Fortune, {
        where: {
            id: id,
            guild_id: guildId
        }
    });

    if(findErr) {
        return errors.sendResponse({ res, next, err: findErr, message: "Error checking Fortune" });
    }

    if(!fortune) {
        return errors.sendResponse({ res, status: 404, message: "No Fortune found" });
    }

    const [deletedFortune, deleteErr] = await entities.destroy<Fortune>(Fortune, fortune);

    if(deleteErr) {
        return errors.sendResponse({ res, next, err: deleteErr, message: "Error deleting Fortune" });
    }

    if(!deletedFortune) {
        return errors.sendResponse({ res, next, message: "No Fortune returned from delete" });
    }

    return res.sendStatus(200);
};

export default destroy;