import { Request, Response, NextFunction } from 'express';
import { GuildPlaylist } from '../../../entities/index.js';

import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { entities, errors } from '../../../utils/index.js';

async function getByGuildIdAndPlaylistName(req: Request, res: Response, next: NextFunction) {

    const { guildId }: ResponseLocalsParams = res.locals.params;
    const [guildPlaylist, err] = await entities.findOne<GuildPlaylist>(GuildPlaylist, {
        select: {
            songs: {
                id: true,
                duration: true
            }
        },
        where: {
            name: req.params.name,
            guild_id: guildId
        },
        relations: ["songs"]
    });

    if(err) {
        return errors.sendResponse({ res, next, err, message: "Error Finding GuildPlaylist" });
    }

    if(!guildPlaylist) {
        return errors.sendResponse({ res, status: 404, message: "No GuildPlaylist Found" });
    }

    const { songs, ...results } = guildPlaylist;

    return res.json({
        results: {
            ...results,
            duration: guildPlaylist.duration,
            songCount: guildPlaylist.songCount
        }
    });
};

export default getByGuildIdAndPlaylistName;