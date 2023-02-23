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

    if(!req.body.balance) {
        return errors.sendResponse({ res, status: 400, message: "Invalid Body" });
    }

    const [updatedRecord, updateErr] = await entities.update<GuildCurrencyRecord>(GuildCurrencyRecord, {
        ...findRes,
        balance: req.body.balance
    });

    if (updateErr || updatedRecord) {
        return errors.sendEntitiesResponse<GuildCurrencyRecord>({
            res,
            err: updateErr,
            message: "Error Updating Guild Currency Record",
            entityReturn: updatedRecord,
            missingEntityReturnMessage: "No Guild Currency Record Returned"
        });
    }

    return res.json({ results: updatedRecord });
};

export default update;