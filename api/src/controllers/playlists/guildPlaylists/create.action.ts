import { Request, Response, NextFunction } from 'express';
import { Permissions } from 'discord.js';

import { GuildPlaylist } from '../../../entities/index.js';

import { errors, entities, discord } from '../../../utils/index.js';

async function create(req: Request, res: Response, next: NextFunction) {

    const playlistName: string = req.body.name;
    const guildId: string = req.body.guild_id;

    const isValidGuildId: boolean = discord.isValidId(guildId); 

    if(!isValidGuildId) {
        return errors.sendResponse({ res, status: 400, message: "Invalid Guild ID" });
    }

    if(playlistName.includes(" ")) {
        return errors.sendResponse({ res, status: 400, message: "Playlist Name Cannot Contain White Space" });
    }

    const [guildPlaylist, err] = await entities.findOne<GuildPlaylist>(GuildPlaylist, {
        where: {
            guild_id: req.body.guild_id,
            name: playlistName       
        }
    });

    if(err) {
        return errors.sendResponse({ res, status: 500, err, message: "Error Checking GuildPlaylist" });
    }

    if(guildPlaylist) {
        return errors.sendResponse({ res, status: 400, message: "Playlist Name Already Exists" });
    }

    const [hasPermission, hasPermissionErr] = await discord.checkMemberPermissions({
        guildId: req.body.guild_id,
        discordId: res.locals.auth.discord_id,
        permission: Permissions.FLAGS.ADMINISTRATOR
    });

    if(hasPermissionErr) {
        return errors.sendResponse({ res, status: 500, err: hasPermissionErr, message: hasPermissionErr.message });
    }

    if(!hasPermission) {
        return errors.sendResponse({ res, status: 403, message: "Unauthorized" });
    }

    const [gpInsert, gpInsertErr] = await entities.insert<GuildPlaylist>(GuildPlaylist, {
        guild_id: req.body.guild_id,
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