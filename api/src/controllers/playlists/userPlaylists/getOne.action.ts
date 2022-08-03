import { Request, Response, NextFunction } from 'express';
import UserPlaylist from '../../../entities/UserPlaylist.js';

import { entities, errors } from '../../../utils/index.js';

async function getOne(req: Request, res: Response, next: NextFunction) {

    const [userPlaylist, err] = await entities.findOne<UserPlaylist>(UserPlaylist, {
        where: {
            id: res.locals.params.id,
            discord_id: res.locals.auth.discord_id
        },
        relations: ["songs"]
    });

    if(err) {
        return errors.sendResponse({
            res,
            next,
            err,
            message: "Error Finding UserPlaylist"
        });
    }

    if(!userPlaylist) {
        return errors.sendResponse({
            res,
            status: 404,
            message: "No UserPlaylist Find One Return"
        });
    }

    return res.json({ results: userPlaylist });
};

export default getOne;