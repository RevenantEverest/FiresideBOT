import { Request, Response, NextFunction } from 'express';

import { errors } from '../utils/index.js';

async function validateDiscordId(req: Request, res: Response, next: NextFunction) {
    const discordId: string = req.params.discordId;

    if(!discordId || typeof discordId !== "string" || discordId.length > 20 || discordId.length < 18) {
        return errors.sendResponse({ res, status: 400, message: "Invalid ID Parameter" });
    }
    else if(discordId !== res.locals.auth.discord_id) {
        return errors.sendResponse({ res, status: 403, message: "Unauthorized" });
    }
    else {
        res.locals.params = {
            discordId
        };
        next();
    }
};

export default validateDiscordId;