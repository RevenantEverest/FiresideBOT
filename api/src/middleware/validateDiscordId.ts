import { Request, Response, NextFunction } from 'express';

import { errors } from '../utils/index.js';

async function validateDiscordId(req: Request, res: Response, next: NextFunction) {
    const discordId: number = parseInt(req.params.discordId, 10);

    if(!discordId || !Number.isInteger(discordId)) {
        return errors.sendResponse({ res, message: "Invalid ID Parameter" });
    }
    else {
        res.locals.params = {
            discordId
        };
        next();
    }
};

export default validateDiscordId;