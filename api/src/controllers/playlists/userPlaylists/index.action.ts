import { Request, Response, NextFunction } from 'express';
import UserPlaylist from '../../../entities/UserPlaylist.js';

import { entities, pagination, errors } from '../../../utils/index.js';

async function index(req: Request, res: Response, next: NextFunction) {

    const { limit, offset } = res.locals;
    const [userPlaylists, err] = await entities.indexAndCount<UserPlaylist>(UserPlaylist, {
        limit, offset
    });

    if(err) {
        return errors.sendResponse({ res, next, err, message: "Error Finding User Playlists" });
    }

    if(!userPlaylists) {
        return errors.sendResponse({ res, next, message: "No User Playlists" });
    }

    const response = pagination.paginateResponse(req, res, userPlaylists);

    return res.json(response);
};

export default index;