import { Request, Response, NextFunction } from 'express';

import { GuildSong } from '../../../entities/index.js';
import { PaginatedResponse } from '../../../types/pagination.js';

import { errors, entities, pagination } from '../../../utils/index.js';

async function index(req: Request, res: Response, next: NextFunction) {

    const { limit, offset } = res.locals;

    const [guildSongs, findErr] = await entities.indexAndCount<GuildSong>(GuildSong, {
        limit, offset
    });

    if(findErr) {
        return errors.sendResponse({ res, next, err: findErr, message: "Error Finding GuildSongs" })
    }

    if(!guildSongs) {
        return errors.sendResponse({ res, status: 404, message: "No GuildSongs" });
    }

    const response: PaginatedResponse<GuildSong> = pagination.paginateResponse(req, res, guildSongs);

    return res.json(response);
};

export default index;