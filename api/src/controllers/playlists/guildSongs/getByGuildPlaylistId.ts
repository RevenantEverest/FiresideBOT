import { Request, Response, NextFunction } from 'express';
import { FindOneOptions } from 'typeorm';

import { GuildSong } from '../../../entities/index.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';
import { PaginatedResponse } from '../../../types/pagination.js';

import { errors, entities, pagination } from '../../../utils/index.js';

async function getByGuildPlaylistId(req: Request, res: Response, next: NextFunction) {
    
    const { guildId, playlistId }: ResponseLocalsParams = res.locals.params;
    const { limit, offset } = res.locals;

    const findOptions: FindOneOptions<GuildSong> = {
        where: {
            playlist: {
                id: playlistId, 
                guild_id: guildId
            }
        }
    };
    const [guildSongs, err] = await entities.findAndCount<GuildSong>(GuildSong, findOptions, {
        limit, offset
    });

    if(err) {
        return errors.sendResponse({ res, next, err, message: "Error Finding GuildSongs" });
    }

    if(!guildSongs) {
        return errors.sendResponse({ res, status: 404, message: "No GuildSongs" });
    }

    const response: PaginatedResponse<GuildSong> = pagination.paginateResponse(req, res, guildSongs);

    return res.json(response);
};

export default getByGuildPlaylistId;