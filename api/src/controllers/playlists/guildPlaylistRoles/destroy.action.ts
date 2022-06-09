import { Request, Response, NextFunction } from 'express';

import { GuildPlaylistRole } from '../../../entities/index.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities } from '../../../utils/index.js';

async function destroy(req: Request, res: Response, next: NextFunction) {

    const { id, guildId }: ResponseLocalsParams = res.locals.params;

    const [guildPlaylistRole, findErr] = await entities.findOne(GuildPlaylistRole, {
        where: {
            id: id,
            playlist: {
                guild_id: guildId
            }
        }
    });

    if(findErr) {
        return errors.sendResponse({ res, next, err: findErr, message: "Error Checking GuildPlaylistRole" });
    }

    if(!guildPlaylistRole) {
        return errors.sendResponse({ res, status: 404, message: "No GuildPlaylistRole Found" });
    }

    const [deletedGuildPlaylistRole, deleteErr] = await entities.destroy<GuildPlaylistRole>(GuildPlaylistRole, guildPlaylistRole);

    if(deleteErr) {
        return errors.sendResponse({ res, next, err: deleteErr, message: "Error Deleteing GuildPlaylistRole" });
    }

    if(!deletedGuildPlaylistRole) {
        return errors.sendResponse({ res, status: 500, message: "No GuildPlaylistRole Delete Return" });
    }

    return res.sendStatus(200);
};

export default destroy;