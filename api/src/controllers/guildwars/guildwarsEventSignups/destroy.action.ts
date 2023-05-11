import { Request, Response, NextFunction } from 'express';

import { GuildWarsEventSignup } from '../../../entities/index.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities } from '../../../utils/index.js';

async function destroy(req: Request, res: Response, next: NextFunction) {

    const { id }: ResponseLocalsParams = res.locals.params;

    const [eventSignup, findErr] = await entities.findOne<GuildWarsEventSignup>(GuildWarsEventSignup, {
        where: {
            discord_id: res.locals.auth.discord_id,
            id: id,
        }
    });

    if(findErr || !eventSignup) {
        return errors.sendEntitiesResponse({
            res,
            err: findErr,
            message: "Error Finding Event Signup",
            entityReturn: eventSignup,
            missingEntityReturnMessage: "No Event Signup Return"
        });
    }

    const [eventSignupDelete, err] = await entities.destroy<GuildWarsEventSignup>(GuildWarsEventSignup, eventSignup);

    if(err || !eventSignupDelete) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error Deleting Event Signup",
            entityReturn: eventSignup,
            missingEntityReturnMessage: "No Event Signup Return"
        });
    }

    return res.json({ results: eventSignup });
};

export default destroy;