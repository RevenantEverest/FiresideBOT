import { Request, Response, NextFunction } from 'express';
import { FindOneOptions } from 'typeorm';

import UserPlaylist from '../../../entities/UserPlaylist.js';
import UserSong from '../../../entities/UserSong.js';
import { PaginatedResponse } from '../../../types/pagination.js';

import { entities, errors, pagination } from '../../../utils/index.js';

async function getByUserPlaylistId(req: Request, res: Response, next: NextFunction) {

    const { playlistId } = res.locals.params;
    const { limit, offset } = res.locals;

    const [userPlaylist, findErr] = await entities.findOne<UserPlaylist>(UserPlaylist, {
        where: {
            id: playlistId
        }
    });

    if(findErr) {
        return errors.sendResponse({ res, next, err: findErr, message: "Error Finding UserPlaylist" });
    }

    if(!userPlaylist) {
        return errors.sendResponse({ res, status: 404, message: "No UserPlaylist" });
    }

    /* Check if non playlist owner is attempting to request a private playlist */
    if(userPlaylist.discord_id !== res.locals.auth.discord_id && !userPlaylist.is_public) {
        return errors.sendResponse({ res, status: 400, message: "User's Playlist is private" });
    }

    const findOptions: FindOneOptions<UserSong> = {
        where: {
            playlist: {
                id: playlistId
            }
        }
    };

    const [userSongs, err] = await entities.findAndCount<UserSong>(UserSong, findOptions, {
        limit, offset
    });

    if(err) {
        return errors.sendResponse({ res, next, err, message: "Error Finding UserSongs" });
    }

    if(!userSongs) {
        return errors.sendResponse({ res, status: 404, message: "No UserSongs" });
    }

    const response: PaginatedResponse<UserSong> = pagination.paginateResponse(req, res, userSongs);

    return res.json(response);
};

export default getByUserPlaylistId;