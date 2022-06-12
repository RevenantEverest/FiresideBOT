import { Request, Response, NextFunction } from 'express';
import { ResponseLocalsParams } from 'src/types/responseLocals.js';
import GuildSetting from '../../../entities/GuildSettings.js';

import { entities, errors } from '../../../utils/index.js';

async function getByGuildId(req: Request, res: Response, next: NextFunction) {

    const { guildId }: ResponseLocalsParams = res.locals.params;

    const [guildSetting, err] = await entities.findOne<GuildSetting>(GuildSetting, {
        where: {
            guild_id: guildId
        }
    });

    if(err) {
        return errors.sendResponse({ res, status: 500, err, message: "Error Finding GuildSettings" });
    }

    if(!guildSetting) {
        return errors.sendResponse({ res, status: 404, message: "No GuildSetting Found" });
    }

    return res.json({ results: guildSetting });
};

export default getByGuildId;