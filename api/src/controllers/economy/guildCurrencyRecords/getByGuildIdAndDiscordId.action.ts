import { Request, Response, NextFunction } from 'express';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { GuildCurrencyRecord } from '../../../entities/index.js';

import { errors, entities } from '../../../utils/index.js';

async function getByGuildIdAndDiscordId(req: Request, res: Response, next: NextFunction) {
    const { guildId, discordId }: ResponseLocalsParams = res.locals.params;

    const [record, err] = await entities.findOne<GuildCurrencyRecord>(GuildCurrencyRecord, {
        where: {
            guild_id: guildId,
            discord_id: discordId
        }
    });

    if(err) {
        return errors.sendResponse({ res, status: 500, err, message: "Error Finding Currency Record" });
    }

    if(!record) {
        return errors.sendResponse({ res, status: 404, message: "No Currency Record Found" });
    }

    return res.json({ results: record });
};

export default getByGuildIdAndDiscordId;