import type { Request, AuthenticatedResponse, NextFunction } from '@@types/express.js';
import type { GuildResolvable, UserResolvable } from 'discord.js';

import { GuildCurrencyRecord } from '@@entities/index.js';

import { errors, entities } from '@@utils/index.js';

interface Params {
    guildId: GuildResolvable,
    discordId: UserResolvable
};

async function update(req: Request, res: AuthenticatedResponse<Params>, next: NextFunction) {

    const { auth, params } = res.locals;

    if(auth && auth.permissions === "USER" && auth.discord_id === params.discordId) {
        return errors.sendResponse({ res, next, status: 400, message: "You can't manually update your own currency" });
    }

    const { guildId, discordId }: Params = params;

    const [findRes, findErr] = await entities.findOne<GuildCurrencyRecord>(GuildCurrencyRecord, {
        where: {
            guild_id: guildId as string,
            discord_id: discordId as string
        }
    });

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

    if (updateErr || !updatedRecord) {
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