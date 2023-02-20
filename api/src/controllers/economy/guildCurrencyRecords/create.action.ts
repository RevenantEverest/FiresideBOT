import { Request, Response, NextFunction } from 'express';
import { PaginatedResponse } from '../../../types/pagination.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { GuildCurrencyRecord, GuildSettings } from '../../../entities/index.js';

import { errors, entities, pagination } from '../../../utils/index.js';

async function create(req: Request, res: Response, next: NextFunction) {

    const { guildId, discordId }: ResponseLocalsParams = res.locals;

    const [guildSettings, settingsErr] = await entities.findOne<GuildSettings>(GuildSettings, {
        where: {
            guild_id: guildId
        }
    });

    if(settingsErr) {
        return errors.sendResponse({ res, status: 500, err: settingsErr, message: "Error Checking Guild Settings" });
    }

    if(!guildSettings) {
        return errors.sendResponse({ res, status: 404, message: "No Guild Settings Found" });
    }

    const [recordInsert, err] = await entities.insert<GuildCurrencyRecord>(GuildCurrencyRecord, {
        guild_id: guildId,
        discord_id: discordId,
        balance: guildSettings.currency_increase_rate.toString()
    });

    if(err) {
        return errors.sendResponse({ res, status: 500, err, message: "Error Saving Currency Record" });
    }

    if(!recordInsert) {
        return errors.sendResponse({ res, status: 500, message: "No Record Insert Returned" });
    }

    return res.json({ results: recordInsert });
};

export default create;