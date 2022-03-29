import { Request, Response, NextFunction } from 'express';
import UserPlaylist from '../../../entities/UserPlaylist.js';

import { entities, errors } from '../../../utils/index.js';

async function create(req: Request, res: Response, next: NextFunction) {
    
    const [userPlaylist, err] = await entities.findOne<UserPlaylist>(UserPlaylist, {
        where: {
            discord_id: res.locals.auth.discord_id,
            name: req.body.name
        }
    });

    if(err) {
        return errors.sendResponse({ res, next, err, message: "Error Checking UserPlaylist" });
    }

    if(userPlaylist) {
        return errors.sendResponse({ res, next, message: "Playlist Name Already Exists" });
    } 

    const [upInsert, upInsertErr] = await entities.insert<UserPlaylist>(UserPlaylist, {
        discord_id: res.locals.auth.discord_id,
        name: req.body.name
    });

    if(upInsertErr) {
        return errors.sendResponse({ res, next, err: upInsertErr, message: "Error Saving UserPlaylist" });
    }

    if(!upInsert) {
        return errors.sendResponse({ res, next, message: "No UserPlaylist Insert Return" });
    }

    return res.json({ results: upInsert });
};

export default create;