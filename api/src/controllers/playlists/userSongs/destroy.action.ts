import { Request, Response, NextFunction } from 'express';
import UserSong from '../../../entities/UserSong.js';

import { entities, errors } from '../../../utils/index.js';

async function destroy(req: Request, res: Response, next: NextFunction) {

    const { id, playlistId } = res.locals.params;

    const [userSong, findErr] = await entities.findOne<UserSong>(UserSong, {
        where: {
            id: id,
            playlist: {
                id: playlistId,
                discord_id: res.locals.auth.discord_id
            }
        }
    });

    if(findErr) {
        return errors.sendResponse({ res, next, err: findErr, message: "Error Checking UserSong" });
    }

    if(!userSong) {
        return errors.sendResponse({ res, status: 404, message: "No UserSong Found" });
    }

    const [deletedUserSong, deleteErr] = await entities.destroy<UserSong>(UserSong, userSong);

    if(deleteErr) {
        return errors.sendResponse({ res, next, err: deleteErr, message: "Error Deleting UserSong" });
    }

    if(!deletedUserSong) {
        return errors.sendResponse({ res, next, message: "No UserSong Delete Return" });
    }

    return res.json({ results: deletedUserSong });
};

export default destroy;