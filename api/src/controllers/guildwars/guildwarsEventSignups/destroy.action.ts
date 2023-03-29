import { Request, Response, NextFunction } from 'express';

import { GuildWarsEventSignup } from '../../../entities/index.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities } from '../../../utils/index.js';

async function destroy(req: Request, res: Response, next: NextFunction) {

    const { id }: ResponseLocalsParams = res.locals.params;

    const [eventSignup, err] = await entities.destroy<GuildWarsEventSignup>(GuildWarsEventSignup, {
       id: id 
    });

    if(err || !eventSignup) {
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