import { Request, Response, NextFunction } from 'express';
import bot from '../../discordBot.js';

import { AuthPayload } from '../../types/auth.js';

import { errors, promises } from '../../utils/index.js';

async function isGuildMember(req: Request, res: Response, next: NextFunction) {
    const { discord_id }: AuthPayload = res.locals.auth;
    const guildId: string = res.locals.params ? res.locals.params.guildId : req.body.guild_id;

    const guildPromise = bot.guilds.fetch(guildId);
    const [guild, guildErr] = await promises.handle(guildPromise);

    if(guildErr) {
        return errors.sendResponse({ res, next, err: guildErr, message: "Error Fetching Guild" });
    }

    if(!guild) {
        return errors.sendResponse({ res, status: 404, message: "Invalid Guild" });
    }

    const guildMemberPromise = guild.members.fetch(discord_id);
    const [guildMember, guildMemberErr] = await promises.handle(guildMemberPromise);

    if(guildMemberErr) {
        if(guildMemberErr.message === "Unknown Member") {
            return errors.sendResponse({ res, status: 401, message: "Unauthorized" });
        }
        
        return errors.sendResponse({ res, next, err: guildMemberErr, message: "Error Fetching Guild Member" });
    }

    if(!guildMember) {
        return errors.sendResponse({ res, status: 401, message: "Unauthorized" });
    }

    next();
};

export default isGuildMember;