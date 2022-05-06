import { Request, Response, NextFunction } from 'express';
import { PaginatedResponse } from 'src/types/pagination.js';
import { FindOneOptions } from 'typeorm';

import { GuildPlaylistRole } from '../../../entities/index.js';

import { errors, entities, pagination } from '../../../utils/index.js';

async function getByGuildIdAndPlaylistId(req: Request, res: Response, next: NextFunction) {

    const { guildId, id } = res.locals.params;
    const { limit, offset } = res.locals;

    const findOptions: FindOneOptions<GuildPlaylistRole> = {
        where: {
            playlist: {
                guild_id: guildId,
                id: id
            }
        }
    };
    const [guildPlaylistRoles, err] = await entities.findAndCount<GuildPlaylistRole>(GuildPlaylistRole, findOptions, {
        limit, offset
    });

    if(err) {
        return errors.sendResponse({ res, next, err, message: "Error Finding GuildPlaylistRoles" });
    }

    if(!guildPlaylistRoles) {
        return errors.sendResponse({ res, status: 404, message: "No GuildPlaylists Found" });
    }

    const response: PaginatedResponse<GuildPlaylistRole> = pagination.paginateResponse<GuildPlaylistRole>(req, res, guildPlaylistRoles);

    return res.json(response);
};

export default getByGuildIdAndPlaylistId;