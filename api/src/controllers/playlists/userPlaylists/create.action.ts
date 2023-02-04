import { Request, Response, NextFunction } from 'express';
import UserPlaylist from '../../../entities/UserPlaylist.js';

import { entities, errors } from '../../../utils/index.js';

async function create(req: Request, res: Response, next: NextFunction) {

    const playlistName: string = req.body.name;
    const isDefault: boolean = req.body.is_default;

    if(playlistName.includes(" ")) {
        return errors.sendResponse({ res, status: 400, message: "Playlist Name Cannot Contain White Space" });
    }
    
    const [userPlaylist, err] = await entities.findOne<UserPlaylist>(UserPlaylist, {
        where: {
            discord_id: res.locals.auth.discord_id,
            name: playlistName
        }
    });

    if(err) {
        return errors.sendResponse({ res, next, err, message: "Error Checking UserPlaylist" });
    }

    if(userPlaylist) {
        return errors.sendResponse({ res, status: 400, message: "Playlist Name Already Exists" });
    } 

    const [upInsert, upInsertErr] = await entities.insert<UserPlaylist>(UserPlaylist, {
        discord_id: res.locals.auth.discord_id,
        name: playlistName,
        ...(isDefault ? { is_default: isDefault } : {})
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