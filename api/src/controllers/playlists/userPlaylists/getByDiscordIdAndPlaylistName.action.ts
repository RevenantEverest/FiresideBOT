import { Request, Response, NextFunction } from 'express';
import { UserPlaylist } from '../../../entities/index.js';

import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { entities, errors } from '../../../utils/index.js';

async function getByDiscordIdAndPlaylistName(req: Request, res: Response, next: NextFunction) {

    const { discordId }: ResponseLocalsParams = res.locals.params;
    const [userPlaylist, err] = await entities.findOne<UserPlaylist>(UserPlaylist, {
        select: {
            songs: {
                id: true,
                duration: true
            }
        },
        where: {
            name: req.params.name,
            discord_id: discordId,
            ...(res.locals.auth.discord_id !== discordId ? { is_public: true } : {})
        },
        relations: ["songs"]
    });

    if(err) {
        return errors.sendResponse({ res, next, err, message: "Error Finding UserPlaylist" });
    }

    if(!userPlaylist) {
        return errors.sendResponse({ res, status: 404, message: "No UserPlaylist Found" });
    }

    const { songs, ...results } = userPlaylist;

    return res.json({ 
        results: {
            ...results,
            duration: userPlaylist.duration,
            songCount: userPlaylist.songCount
        }
    });
};

export default getByDiscordIdAndPlaylistName;