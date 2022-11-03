import { Request, Response, NextFunction } from 'express';
import UserPlaylist from '../../../entities/UserPlaylist.js';

import { entities, errors } from '../../../utils/index.js';

async function update(req: Request, res: Response, next: NextFunction) {

    const playlistName: string = req.body.name;

    if(playlistName && playlistName.includes(" ")) {
        return errors.sendResponse({ res, status: 400, message: "Playlist Name Cannot Contain White Space" });
    }

    const { id } = res.locals.params;

    const [findRes, findErr] = await entities.findOne<UserPlaylist>(UserPlaylist, {
        where: {
            id: id, 
            discord_id: res.locals.auth.discord_id
        }
    });

    if(findErr) {
        return errors.sendResponse({ res, next, err: findErr, message: "Error Checking UserPlaylist" });
    }

    if(!findRes) {
        return errors.sendResponse({ res, status: 404, message: "UserPlaylist Not Found" });
    }

    if(findRes.name === playlistName) {
        return errors.sendResponse({ res, status: 400, message: "Playlist name already exists" });
    }

    const [updatedUserPlaylist, updateErr] = await entities.update<UserPlaylist>(UserPlaylist, {
        ...findRes,
        discord_id: res.locals.auth.discord_id,
        name: playlistName,
        is_public: req.body.is_public
    });

    if(updateErr) {
        return errors.sendResponse({ res, next, err: updateErr, message: "Error Updating UserPlaylist" });
    }

    if(!updatedUserPlaylist) {
        return errors.sendResponse({ res, next, message: "No Updated UserPlaylist Returned" });
    } 

    return res.json({ results: updatedUserPlaylist });
};

export default update;