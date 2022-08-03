import { Request, Response, NextFunction } from 'express';

import { GuildPlaylistRole } from '../../../entities/index.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities } from '../../../utils/index.js';

async function getOne(req: Request, res: Response, next: NextFunction) {
    const { playlistId, guildId, id }: ResponseLocalsParams = res.locals.params;

    const [guildPlaylistRole, err] = await entities.findOne<GuildPlaylistRole>(GuildPlaylistRole, {
        where: {
            id: id,
            playlist: {
                id: playlistId,
                guild_id: guildId
            }
        }
    });

    if(err) {
        return errors.sendResponse({ res, status: 500, err, message: "Error Finding GuildPlaylistRole" });
    }

    if(!guildPlaylistRole) {
        return errors.sendResponse({ res, status: 404, message: "No GuildPlaylistRole Found" });
    }

    return res.json({ results: guildPlaylistRole });
};

export default getOne;