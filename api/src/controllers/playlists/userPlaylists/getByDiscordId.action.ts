import { Request, Response, NextFunction } from 'express';
import { FindOneOptions } from 'typeorm';

import UserPlaylist from '../../../entities/UserPlaylist.js';
import { PaginatedResponse } from '../../../types/pagination.js';

import { entities, errors, pagination } from '../../../utils/index.js';

async function getByDiscordId(req: Request, res: Response, next: NextFunction) {
    
    const { discordId } = res.locals.params;
    const { limit, offset } = res.locals;

    const findOptions: FindOneOptions<UserPlaylist> = {
        where: {
            discord_id: discordId
        }
    };
    const [userPlaylists, err] = await entities.findAndCount<UserPlaylist>(UserPlaylist, findOptions, {
        limit, offset
    });

    if(err) {
        return errors.sendResponse({ res, next, err, message: "Error Finding UserPlaylists" });
    }

    if(!userPlaylists) {
        return errors.sendResponse({ res, status: 404, message: "No UserPlaylist Found" });
    }

    const response: PaginatedResponse<UserPlaylist> = pagination.paginateResponse(req, res, userPlaylists);

    return res.json(response);
};

export default getByDiscordId;