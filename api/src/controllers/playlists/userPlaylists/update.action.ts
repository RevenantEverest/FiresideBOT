import { Request, Response, NextFunction } from 'express';
import UserPlaylist from '../../../entities/UserPlaylist.js';

import { entities, errors } from '../../../utils/index.js';

async function update(req: Request, res: Response, next: NextFunction) {

    const { id } = res.locals.params;

    const [findRes, findErr] = await entities.findOne<UserPlaylist>(UserPlaylist, {
        id: id, 
        discord_id: res.locals.auth.discord_id
    });

    if(findErr) {
        return errors.sendResponse({ res, next, err: findErr, message: "Error Checking UserPlaylist" });
    }

    if(!findRes) {
        return errors.sendResponse({ res, next, message: "UserPlaylist doesn't exist" });
    }

    const [updatedUserPlaylist, updateErr] = await entities.update<UserPlaylist>(UserPlaylist, {
        ...findRes,
        discord_id: res.locals.auth.discord_id,
        name: req.body.name
    });

    if(updateErr) {
        return errors.sendResponse({ res, next, err: updateErr, message: "Error Updating UserPlaylist" });
    }

    if(!updatedUserPlaylist) {
        return errors.sendResponse({ res, next, message: "No Updated UserPlaylist Returned" });
    } 

    res.json({ results: updatedUserPlaylist });
};

export default update;