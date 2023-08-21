import { Request, Response, NextFunction } from 'express';

import { GuildWarsEventSignup } from '../../../entities/index.js';
import { ResponseLocalsParams, AuthenticatedResponseLocals } from '../../../types/responseLocals.js';
import { AuthPayload } from '../../../types/auth.js';


import { errors, entities, guildwarsEvents, dates } from '../../../utils/index.js';

interface ReqBody {
    event_name: string,
    event_time: string,
    timezone: string
};

async function create(req: Request, res: Response, next: NextFunction) {
    const auth: AuthPayload = res.locals.auth;

    const body: ReqBody = req.body;
    const parsedEventTime = dates.convertToUTCFromTimezoneAndFormat(body.event_time, ["hh:mma"], body.timezone, {
        timeFormat: "HH:mm"
    }).time;
    const event = guildwarsEvents.getEvent(body.event_name, parsedEventTime);

    if(!event) {
        return errors.sendResponse({ res, next, status: 404, message: "No event found by that title or time" });
    }

    const [eventSignup, err] = await entities.insert<GuildWarsEventSignup>(GuildWarsEventSignup, {
        discord_id: auth.discord_id,
        event_title: event.title,
        event_time: event.time
    });

    if(err || !eventSignup) {
        if(err && err.message === 'duplicate key value violates unique constraint "UQ_1d7a8478b0fdca02d4b56dfed46"') {
            return errors.sendResponse({ res, status: 400, message: "Already signed up for this event" });
        }
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