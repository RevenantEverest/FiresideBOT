import { Request, Response, NextFunction } from 'express';
import { PaginatedResponse } from 'src/types/pagination.js';

import GuildSetting from '../../../entities/GuildSettings.js';

import { entities, errors, pagination } from '../../../utils/index.js';

async function index(req: Request, res: Response, next: NextFunction) {
    
    const { limit, offset } = res.locals;
    const [guildSettings, err] = await entities.indexAndCount<GuildSetting>(GuildSetting, {
        limit, offset
    });

    if(err) {
        return errors.sendResponse({ res, status: 500, err, message: "Error Finding GuildSettings" });
    }

    if(!guildSettings) {
        return errors.sendResponse({ res, status: 404, message: "No GuildSettings" });
    }

    const response: PaginatedResponse<GuildSetting> = pagination.paginateResponse<GuildSetting>(req, res, guildSettings);

    return res.json(response);
};

export default index;