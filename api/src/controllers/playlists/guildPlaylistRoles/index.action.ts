import { Request, Response, NextFunction } from 'express';
import { PaginatedResponse } from 'src/types/pagination.js';

import { GuildPlaylistRole } from '../../../entities/index.js';

import { errors, entities, pagination } from '../../../utils/index.js';

async function index(req: Request, res: Response, next: NextFunction) {
    
    const { limit, offset } = res.locals;
    const [guildPlaylistRoles, err] = await entities.indexAndCount<GuildPlaylistRole>(GuildPlaylistRole, {
        limit, offset
    });

    if(err) {
        return errors.sendResponse({ res, status: 500, err, message: "Error Finding GuildPlaylistRoles" });
    }

    if(!guildPlaylistRoles) {
        return errors.sendResponse({ res, status: 404, message: "No GuildPlaylistRoles" });
    }

    const response: PaginatedResponse<GuildPlaylistRole> = pagination.paginateResponse<GuildPlaylistRole>(req, res, guildPlaylistRoles);

    return res.json(response);
};

export default index;