import { Request, Response, NextFunction } from 'express';
import { PaginatedResponse } from '../../../types/pagination.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { GuildCurrencyRecord } from '../../../entities/index.js';

import { errors, entities, pagination } from '../../../utils/index.js';

async function update(req: Request, res: Response, next: NextFunction) {
    const { guildId, discordId }: ResponseLocalsParams = res.locals.params;
    
    const [findRes, findErr] = await entities.findOne<GuildCurrencyRecord>(GuildCurrencyRecord, {
        where: {
            guild_id: guildId,
            discord_id: discordId
        }
    });

    if(findErr) {
        return 
    }

    if(findErr || !findRes) {
        return errors.sendEntitiesResponse<GuildCurrencyRecord>({ 
            res, 
            err: findErr,
            message: "Error Finding Guild Currency Record",
            entityReturn: findRes,
            missingEntityReturnMessage: "Guild Currency Record Not Found"
        });
    }
};

export default update;