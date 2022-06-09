import { Request, Response, NextFunction } from 'express';
import { Permissions } from 'discord.js';

import { GuildPlaylistRole } from '../../entities/index.js';

import { errors, entities, discord } from '../../utils/index.js';
import { FindOneOptions } from 'typeorm';

async function hasGuildPlaylistRole(req: Request, res: Response, next: NextFunction) {

    const guildId: string = res.locals.params ? res.locals.params.guildId : req.body.guild_id;
    const discordId: string = res.locals.auth.discord_id;
    const playlistId: number = res.locals.params.playlistId;

    const [hasPermission, hasPermissionErr] = await discord.checkMemberPermissions({
        guildId: guildId,
        discordId: res.locals.auth.discord_id,
        permission: Permissions.FLAGS.ADMINISTRATOR
    });

    if(hasPermissionErr) {
        return errors.sendResponse({ res, status: 500, err: hasPermissionErr, message: hasPermissionErr.message });
    }

    if(hasPermission) {
        return next();
    }

    const findOptions: FindOneOptions<GuildPlaylistRole> = {
        where: {
            playlist: {
                id: playlistId,
                guild_id: guildId
            }
        }
    };
    const [guildPlaylistRoles, findErr] = await entities.find<GuildPlaylistRole>(GuildPlaylistRole, findOptions);

    if(findErr) {
        return errors.sendResponse({ res, status: 500, err: findErr, message: "Error Checking GuildPlaylistRoles" });
    }

    if(!guildPlaylistRoles) {
        return errors.sendResponse({ res, status: 401, message: "Unauthorized" });
    }

    const roles = guildPlaylistRoles.map((role) => role.role_id);

    const [hasRole, hasRoleErr] = await discord.hasRole({ guildId, discordId, roles });

    if(hasRoleErr) {
        return errors.sendResponse({ res, status: 500, err: hasRoleErr, message: hasRoleErr.message });
    }

    if(!hasRole) {
        return errors.sendResponse({ res, status: 401, message: "Unauthorized" });
    }

    next();
};

export default hasGuildPlaylistRole;