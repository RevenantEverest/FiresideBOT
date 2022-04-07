import { Request, Response, NextFunction } from 'express';
import UserSong from '../../../entities/UserSong.js';

import { entities, errors } from '../../../utils/index.js';

async function getOne(req: Request, res: Response, next: NextFunction) {

    const { id, playlistId } = res.locals.params;
    
    const [userSong, err] = await entities.findOne<UserSong>(UserSong, {
        where: {
            id: id,
            playlist: {
                id: playlistId,
                discord_id: res.locals.auth.discord_id
            }
        }
    });

    if(err) {
        return errors.sendResponse({ res, next, err, message: "Error Finding UserSongs" });
    }

    if(!userSong) {
        return errors.sendResponse({ res, status: 404, message: "No UserSong" });
    }

    return res.json({ results: userSong });
};

export default getOne;