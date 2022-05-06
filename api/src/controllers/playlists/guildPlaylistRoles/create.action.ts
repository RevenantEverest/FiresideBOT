import { Request, Response, NextFunction } from 'express';

import { GuildPlaylist, GuildPlaylistRole } from '../../../entities/index.js';
import { ResponseLocals, ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities, discord } from '../../../utils/index.js';

async function create(req: Request, res: Response, next: NextFunction) {
    const roleId: string = req.body.role_id;
    const isValidId: boolean = discord.isValidId(roleId);

    const { guildId, id }: ResponseLocalsParams = res.locals.params;

    if(!isValidId) {
        return errors.sendResponse({ res, status: 400, message: "Invalid Role ID" });
    }

    const [guildPlaylist, findErr] = await entities.findOne<GuildPlaylist>(GuildPlaylist, {
        where: {
            guild_id: guildId,
            id: id
        }
    });

    if(findErr) {
        return errors.sendResponse({ res, status: 500, err: findErr, message: "Error Checking GuildPlaylist" });
    }

    if(!guildPlaylist) {
        return errors.sendResponse({ res, status: 404, message: "GuildPlaylist Not Found" });
    }

    const [gprInsert, gprInsertErr] = await entities.insert<GuildPlaylistRole>(GuildPlaylistRole, {
        playlist: guildPlaylist,
        role_id: roleId
    });

    if(gprInsertErr) {
        return errors.sendResponse({ res, status: 500, err: gprInsertErr, message: "Error Saving GuildPlaylistRole" });
    }

    if(!gprInsert) {
        return errors.sendResponse({ res, status: 500, message: "No GuildPlaylistRole Insert Return" });
    }

    return res.json({ results: gprInsert });
};

export default create;