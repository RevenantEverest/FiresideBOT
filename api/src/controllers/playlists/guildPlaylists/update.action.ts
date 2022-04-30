import { Request, Response, NextFunction } from 'express';

import { GuildPlaylist } from '../../../entities/index.js';
import { LocalsParams } from '../../../types/responseLocals.js';

import { errors, entities } from '../../../utils/index.js';

async function update(req: Request, res: Response, next: NextFunction) {

    const playlistName: string = req.body.name;

    if(playlistName.includes(" ")) {
        return errors.sendResponse({ res, status: 400, message: "Playlist Name Cannot Contain White Space" });
    }

    const { guildId, id }: LocalsParams = res.locals.params;

    const [findRes, findErr] = await entities.findOne<GuildPlaylist>(GuildPlaylist, {
        where: {
            id: id,
            guild_id: guildId
        }
    });

    if(findErr) {
        return errors.sendResponse({ res, next, err: findErr, message: "Error Checking GuildPlaylist" });
    }

    if(!findRes) {
        return errors.sendResponse({ res, status: 404, message: "GuildPlaylist Not Found" });
    }

    if(findRes.name === playlistName) {
        return errors.sendResponse({ res, status: 400, message: "Playlist Name Already Exists" });
    }

    const [updatedGuildPlaylist, updateErr] = await entities.update<GuildPlaylist>(GuildPlaylist, {
        ...findRes,
        name: playlistName
    });

    if(updateErr) {
        return errors.sendResponse({ res, next, err: updateErr, message: "Error Updating GuildPlaylist" });
    }

    if(!updatedGuildPlaylist) {
        return errors.sendResponse({ res, next, message: "No Updated GuildPlaylist Returned" });
    }

    return res.json({ results: updatedGuildPlaylist });
};

export default update;