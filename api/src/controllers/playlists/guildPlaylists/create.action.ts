import { Request, Response, NextFunction } from 'express';

import { GuildPlaylist } from '../../../entities/index.js';
import { LocalsParams } from 'src/types/responseLocals.js';

import { errors, entities } from '../../../utils/index.js';

async function create(req: Request, res: Response, next: NextFunction) {

    const playlistName: string = req.body.name;

    const { guildId }: LocalsParams = res.locals.params;

    if(playlistName.includes(" ")) {
        return errors.sendResponse({ res, status: 400, message: "Playlist Name Cannot Contain White Space" });
    }

    const [guildPlaylist, err] = await entities.findOne<GuildPlaylist>(GuildPlaylist, {
        where: {
            guild_id: guildId,
            name: playlistName       
        }
    });

    if(err) {
        return errors.sendResponse({ res, status: 500, err, message: "Error Checking GuildPlaylist" });
    }

    if(guildPlaylist) {
        return errors.sendResponse({ res, status: 400, message: "Playlist Name Already Exists" });
    }

    const [gpInsert, gpInsertErr] = await entities.insert<GuildPlaylist>(GuildPlaylist, {
        guild_id: guildId,
        name: playlistName
    });

    if(gpInsertErr) {
        return errors.sendResponse({ res, status: 500, err: gpInsertErr, message: "Error Saving GuildPlaylist" });
    }

    if(!gpInsert) {
        return errors.sendResponse({ res, status: 500, message: "No GuildPlaylist Insert Return" });
    }

    return res.json({ results: gpInsert });
};

export default create;