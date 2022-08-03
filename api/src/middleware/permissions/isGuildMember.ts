import { Request, Response, NextFunction } from 'express';

import { AuthPayload } from '../../types/auth.js';

import { errors, discord } from '../../utils/index.js';

async function isGuildMember(req: Request, res: Response, next: NextFunction) {
    const { discord_id }: AuthPayload = res.locals.auth;
    const guildId: string = res.locals.params ? res.locals.params.guildId : req.body.guild_id;

    const [isMember, err] = await discord.isGuildMember({ guildId, discordId: discord_id });

    if(err) {
        errors.sendResponse({ res, next, err: err, message: err.message });
    }

    if(!isMember) {
        return errors.sendResponse({ res, status: 403, message: "Forbidden" });
    }

    next();
};

export default isGuildMember;