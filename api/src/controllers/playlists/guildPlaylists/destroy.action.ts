import { Request, Response, NextFunction } from 'express';

import { GuildPlaylist } from '../../../entities/index.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities } from '../../../utils/index.js';

async function destroy(req: Request, res: Response, next: NextFunction) {

    const { id, guildId }: ResponseLocalsParams = res.locals.params;

    const [guildPlaylist, findErr] = await entities.findOne<GuildPlaylist>(GuildPlaylist, {
        where: {
            id: id,
            guild_id: guildId
        }
    });

    if(findErr) {
        return errors.sendResponse({ res, next, err: findErr, message: "Error Checking GuildPlaylist" });
    }

    if(!guildPlaylist) {
        return errors.sendResponse({ res, status: 404, message: "No GuildPlaylist Found" });
    }

    const [deletedGuildPlaylist, deleteErr] = await entities.destroy<GuildPlaylist>(GuildPlaylist, guildPlaylist);

    if(deleteErr) {
        return errors.sendResponse({ res, next, err: deleteErr, message: "Error Deleting GuildPlaylist" });
    }

    if(!deletedGuildPlaylist) {
        return errors.sendResponse({ res, next, message: "No GuildPlaylist Delete Return" });
    }

    return res.sendStatus(200);
};

export default destroy;