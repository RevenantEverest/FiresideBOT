import { Request, Response, NextFunction } from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

import { GuildWarsEventSignup } from '../../../entities/index.js';
import { ResponseLocalsParams, AuthenticatedResponseLocals } from '../../../types/responseLocals.js';
import { AuthPayload } from '../../../types/auth.js';


import { errors, entities, guildwarsEvents } from '../../../utils/index.js';

dayjs.extend(utc);

interface ReqBody {
    event_name: string,
    event_time: string,
    timezone: string
};

async function create(req: Request, res: Response, next: NextFunction) {
    const auth: AuthPayload = res.locals.auth;

    const body: ReqBody = req.body;
    const event = guildwarsEvents.getEvent(body.event_name, body.event_time);

    if(!event) {
        return errors.sendResponse({ res, next, status: 404, message: "No event found by that title or time" });
    }

    console.log(event);

    const [eventSignup, err] = await entities.insert<GuildWarsEventSignup>(GuildWarsEventSignup, {
        discord_id: auth.discord_id,
        event_title: event.title,
        event_time: event.time
    });

    if(err || !eventSignup) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error Saving Event Signup",
            entityReturn: eventSignup,
            missingEntityReturnMessage: "No Event Signup Returned From Insert"
        });
    }

    return res.json({ results: eventSignup });
};

export default create;