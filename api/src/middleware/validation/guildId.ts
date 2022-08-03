import { Request, Response, NextFunction } from 'express';

import { errors, discord } from '../../utils/index.js';

async function guildId(req: Request, res: Response, next: NextFunction) {
    const guildId: string = req.params.guildId;
    const isValidId: boolean = discord.isValidId(guildId);

    if(!res.locals.params) {
        res.locals.params = {};
    }

    if(!isValidId) {
        return errors.sendResponse({ res, status: 400, message: "Invalid ID Parameter" });
    }
    
    res.locals.params["guildId"] = guildId;
    next();
};

export default guildId;