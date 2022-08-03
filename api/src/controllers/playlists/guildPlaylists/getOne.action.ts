import { Request, Response, NextFunction } from 'express';
import { Permissions } from 'discord.js';

import { GuildPlaylist } from '../../../entities/index.js';

import { errors, entities, discord } from '../../../utils/index.js';

async function getOne(req: Request, res: Response, next: NextFunction) {

    const guildId: string = res.locals.params.guildId;
    const id: number = res.locals.params.id;

    const [guildPlaylist, err] = await entities.findOne<GuildPlaylist>(GuildPlaylist, {
        where: {
            id: id,
            guild_id: guildId
        },
        relations: ["songs"]
    });

    if(err) {
        return errors.sendResponse({ res, status: 500, err, message: "Error Finding GuildPlaylist" });
    }

    if(!guildPlaylist) {
        return errors.sendResponse({ res, status: 404, message: "No GuildPlaylist Found" });
    }

    return res.json({ results: guildPlaylist });
};

export default getOne;