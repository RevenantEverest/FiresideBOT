import { Request, Response, NextFunction } from 'express';

import { GuildSong } from '../../../entities/index.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities } from '../../../utils/index.js';

async function destroy(req: Request, res: Response, next: NextFunction) {

    const { id, playlistId, guildId }: ResponseLocalsParams = res.locals.params;

    const [guildSong, findErr] = await entities.findOne<GuildSong>(GuildSong, {
        where: {
            id: id,
            playlist: {
                id: playlistId,
                guild_id: guildId
            }
        }
    });

    if(findErr) {
        return errors.sendResponse({ res, next, err: findErr, message: "Error Checking GuildSong" });
    }

    if(!guildSong) {
        return errors.sendResponse({ res, status: 404, message: "No GuildSong Found" });
    }

    const [deletedGuildSong, deleteErr] = await entities.destroy<GuildSong>(GuildSong, guildSong);

    if(deleteErr) {
        return errors.sendResponse({ res, next, err: deleteErr, message: "Error Deleteing GuildSong" });
    }

    if(!deletedGuildSong) {
        return errors.sendResponse({ res, next, message: "No GuildSong, Delete Return" });
    }

    return res.sendStatus(200);
};

export default destroy;