import { Request, Response, NextFunction } from 'express';
import { FindOneOptions } from 'typeorm';

import { GuildPlaylist } from '../../../entities/index.js';

import { errors, entities, pagination } from '../../../utils/index.js';

async function getByGuildId(req: Request, res: Response, next: NextFunction) {

    const { guildId } = res.locals.params;
    const { limit, offset } = res.locals;

    const findOptions: FindOneOptions<GuildPlaylist> = {
        select: {
            songs: {
                id: true,
                duration: true
            }
        },
        where: {
            guild_id: guildId
        },
        relations: ["songs"]
    };
    const [guildPlaylists, err] = await entities.findAndCount<GuildPlaylist>(GuildPlaylist, findOptions, {
        limit, offset
    });

    if(err) {
        return errors.sendResponse({ res, next, err, message: "Error Finding GuildPlaylist" });
    }

    if(!guildPlaylists) {
        return errors.sendResponse({ res, status: 404, message: "No GuildPlaylists Found" });
    }

    const results = guildPlaylists[0].map((guildPlaylist) => {
        const { songs, ...playlist } = guildPlaylist;

        return {
            ...playlist,
            duration: guildPlaylist.duration,
            songCount: guildPlaylist.songCount
        };
    });

    const response = pagination.paginateResponse(req, res, [results, guildPlaylists[1]]);

    return res.json(response);
};

export default getByGuildId;