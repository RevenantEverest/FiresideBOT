import { Request, Response, NextFunction } from 'express';

import { GuildWarsEventSignup } from '../../../entities/index.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities } from '../../../utils/index.js';

async function getOne(req: Request, res: Response, next: NextFunction) {

    const { id }: ResponseLocalsParams = res.locals.params;
    const [eventSignup, err] = await entities.findOne<GuildWarsEventSignup>(GuildWarsEventSignup, {
        where: {
            discord_id: res.locals.auth.discord_id,
            id: id
        }
    });

    if(err || !eventSignup) {
        return errors.sendEntitiesResponse({
            res, 
            err,
            message: "Error Finding Event Signup",
            entityReturn: eventSignup,
            missingEntityReturnMessage: "No Event Signup Returned"
        });
    }

    return res.json({ results: eventSignup });
};

export default getOne;