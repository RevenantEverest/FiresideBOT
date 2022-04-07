import { Request, Response, NextFunction } from 'express';
import UserPlaylist from '../../../entities/UserPlaylist.js';

import { entities, errors } from '../../../utils/index.js';

async function destroy(req: Request, res: Response, next: NextFunction) {
    
    const { id } = res.locals.params;

    const [userPlaylist, findErr] = await entities.findOne<UserPlaylist>(UserPlaylist, {
        where: {
            id: id,
            discord_id: res.locals.auth.discord_id
        }
    });

    if(findErr) {
        return errors.sendResponse({ res, next, err: findErr, message: "Error Checking UserPlaylist" });
    }

    if(!userPlaylist) {
        return errors.sendResponse({ res, status: 404, message: "No UserPlaylist Found" });
    }

    const [deletedUserPlaylist, deleteErr] = await entities.destroy<UserPlaylist>(UserPlaylist, userPlaylist);

    if(deleteErr) {
        return errors.sendResponse({ res, next, err: deleteErr, message: "Error Deleting UserPlaylist" });
    }

    if(!deletedUserPlaylist) {
        return errors.sendResponse({ res, next, message: "No UserPlaylist Delete Return" });
    }

    return res.sendStatus(200);
};

export default destroy;