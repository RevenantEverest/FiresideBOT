import { Request, Response, NextFunction } from 'express';
import { FindOneOptions } from 'typeorm';
import UserPlaylist from '../../../entities/UserPlaylist.js';

import { entities, errors, pagination } from '../../../utils/index.js';

async function getByDiscordId(req: Request, res: Response, next: NextFunction) {
    
    const { discordId } = res.locals.params;
    const { limit, offset } = res.locals;

    const findOptions: FindOneOptions<UserPlaylist> = {
        select: {
            songs: {
                id: true,
                duration: true
            }
        },
        where: {
            discord_id: discordId,
            ...(res.locals.auth.discord_id !== discordId ? { is_public: true } : {})
        },
        relations: ["songs"]
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

    const results = userPlaylists[0].map((userPlaylist) => {
        const { songs, ...playlist } = userPlaylist;

        return {
            ...playlist,
            duration: userPlaylist.duration,
            songCount: userPlaylist.songCount
        };
    });

    const response = pagination.paginateResponse(req, res, [results, userPlaylists[1]]);

    return res.json(response);
};

export default getByDiscordId;