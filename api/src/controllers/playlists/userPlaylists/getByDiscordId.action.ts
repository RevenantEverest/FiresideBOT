import { Request, Response, NextFunction } from 'express';
import UserPlaylist from '../../../entities/UserPlaylist.js';

import { entities, errors, pagination } from '../../../utils/index.js';

async function getByDiscordId(req: Request, res: Response, next: NextFunction) {
    
    const { discordId } = res.locals.params;
    const { limit, offset } = res.locals;

    const conditional = {
        discord_id: discordId
    }
    const [userPlaylists, err] = await entities.findAndCount<UserPlaylist>(UserPlaylist, conditional, {
        limit, offset
    });

    if(err) {
        return errors.sendResponse({ res, next, err, message: "Error Finding UserPlaylists" });
    }

    if(!userPlaylists) {
        return errors.sendResponse({ res, next, message: "No userPlaylists" });
    }

    const response = pagination.paginateResponse(req, res, userPlaylists);

    return res.json(response);
};

export default getByDiscordId;