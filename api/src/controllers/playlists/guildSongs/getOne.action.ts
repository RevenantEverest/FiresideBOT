import { Request, Response, NextFunction } from 'express';

import { GuildSong } from '../../../entities/index.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities } from '../../../utils/index.js';

async function getOne(req: Request, res: Response, next: NextFunction) {

    const { id, playlistId, guildId }: ResponseLocalsParams = res.locals.params;

    const [guildSong, err] = await entities.findOne<GuildSong>(GuildSong, {
        where: {
            id: id,
            playlist: {
                id: playlistId,
                guild_id: guildId
            }
        }
    });

    if(err) {
        return errors.sendResponse({ res, next, err, message: "Error Finding GuildSong" });
    }

    if(!guildSong) {
        return errors.sendResponse({ res, status: 404, message: "No GuildSong" });
    }

    return res.json({ results: guildSong });
};  

export default getOne;