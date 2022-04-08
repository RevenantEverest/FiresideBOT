import { Request, Response, NextFunction } from 'express';

import UserSong from '../../../entities/UserSong.js';
import { PaginatedResponse } from '../../../types/pagination.js';

import { entities, errors, pagination } from '../../../utils/index.js';

async function index(req: Request, res: Response, next: NextFunction) {

    const { limit, offset } = res.locals;

    const [userSongs, findErr] = await entities.indexAndCount<UserSong>(UserSong, {
        limit, offset
    });

    if(findErr) {
        return errors.sendResponse({ res, next, err: findErr, message: "Error Finding UserSongs" });
    }

    if(!userSongs) {
        return errors.sendResponse({ res, status: 404, message: "No UserSongs" });
    }

    const response: PaginatedResponse<UserSong> = pagination.paginateResponse(req, res, userSongs);

    return res.json(response);
};

export default index;