import { Request, Response, NextFunction } from 'express';

import { errors, discord } from '../../utils/index.js';

async function discordId(req: Request, res: Response, next: NextFunction) {
    const discordId: string = req.params.discordId;
    const isValidId: boolean = discord.isValidId(discordId);

    if(!res.locals.params) {
        res.locals.params = {};
    }

    if(!isValidId) {
        return errors.sendResponse({ res, status: 400, message: "Invalid ID Parameter" });
    }
    
    if(discordId !== res.locals.auth.discord_id) {
        return errors.sendResponse({ res, status: 403, message: "Unauthorized" });
    }

    res.locals.params["discordId"] = discordId;
    next();
};

export default discordId;