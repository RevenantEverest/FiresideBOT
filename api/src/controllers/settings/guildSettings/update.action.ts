import { Request, Response, NextFunction } from 'express';
import GuildSettings from '../../../entities/GuildSettings.js';

import { entities, errors } from '../../../utils/index.js';
import { ResponseLocalsParams } from 'src/types/responseLocals.js';

async function update(req: Request, res: Response, next: NextFunction) {

    const { guildId }: ResponseLocalsParams  = res.locals.params;

    const [findRes, findErr] = await entities.findOne<GuildSettings>(GuildSettings, {
        where: {
            guild_id: guildId
        }
    });

    if(findErr) {
        return errors.sendResponse({ res, next, err: findErr, message: "Error Checking GuildSettings" });
    }

    if(!findRes) {
        return errors.sendResponse({ res, status: 404, message: "GuildSettings Not Found" });
    }

    const [updateRes, updateErr] = await entities.update<GuildSettings>(GuildSettings, {
        ...findRes,
        ...req.body
    });

    if(updateErr) {
        return errors.sendResponse({ res, next, err: updateErr, message: "Error Updating GuildSettings" });
    }

    if(!updateRes) {
        return errors.sendResponse({ res, next, message: "No Updated GuildSettings Returned" });
    }

    return res.json({ results: updateRes });
};

export default update;