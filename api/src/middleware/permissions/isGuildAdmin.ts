import { Request, Response, NextFunction } from 'express';
import { Permissions } from 'discord.js';

import { errors, discord } from '../../utils/index.js';

async function isGuildAdmin(req: Request, res: Response, next: NextFunction) {

    const guildId: string = res.locals.params ? res.locals.params.guildId : req.body.guild_id;

    const [hasPermission, hasPermissionErr] = await discord.checkMemberPermissions({
        guildId: guildId,
        discordId: res.locals.auth.discord_id,
        permission: Permissions.FLAGS.ADMINISTRATOR
    });

    if(hasPermissionErr) {
        return errors.sendResponse({ res, status: 500, err: hasPermissionErr, message: hasPermissionErr.message });
    }

    if(!hasPermission) {
        return errors.sendResponse({ res, status: 403, message: "Unauthorized" });
    }

    next();
};

export default isGuildAdmin;