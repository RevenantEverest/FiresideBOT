import { Request, Response, NextFunction } from 'express';
import { PaginatedResponse } from 'src/types/pagination.js';

import { GuildPlaylist } from '../../../entities/index.js';

import { errors, entities, pagination } from '../../../utils/index.js';

async function index(req: Request, res: Response, next: NextFunction) {

    const { limit, offset } = res.locals;
    const [guildPlaylists, err] = await entities.indexAndCount<GuildPlaylist>(GuildPlaylist, {
        limit, offset
    });

    if(err) {
        return errors.sendResponse({ res, next, err, message: "Error Finding GuildPlaylists" });
    }

    if(!guildPlaylists) {
        return errors.sendResponse({ res, status: 404, message: "No Guild Playlists" });
    }

    const response: PaginatedResponse<GuildPlaylist> = pagination.paginateResponse<GuildPlaylist>(req, res, guildPlaylists);

    return res.json(response);
};

export default index;