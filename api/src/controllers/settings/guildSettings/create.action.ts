import { Request, Response, NextFunction } from 'express';
import { QueryFailedError } from 'typeorm';

import { ResponseLocalsParams } from 'src/types/responseLocals.js';
import GuildSetting from '../../../entities/GuildSettings.js';

import { entities, errors } from '../../../utils/index.js';

async function create(req: Request, res: Response, next: NextFunction) {

    const { guildId }: ResponseLocalsParams = res.locals.params;

    const [guildSettings, err] = await entities.insert<GuildSetting>(GuildSetting, {
        guild_id: guildId
    });

    if(err) {
        if(err instanceof QueryFailedError) {
            if(err.driverError.code === "23505") {
                return errors.sendResponse({ res, status: 400, message: "Settings Already Exist for Guild" });
            }
        }
        return errors.sendResponse({ res, status: 500, err, message: "Error Saving GuildSetting" });
    }

    if(!guildSettings) {
        return errors.sendResponse({ res, status: 500, err, message: "No GuildSetting Returned From Insert" });
    }

    return res.json({ results: guildSettings });
};

export default create;