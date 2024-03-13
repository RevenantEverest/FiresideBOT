import type { GuildResolvable, UserResolvable } from 'discord.js';
import type { Request, AuthenticatedResponse, NextFunction } from '@@types/express.js';

import { GuildCurrencyRecord, GuildSettings } from '@@entities/index.js';

import { errors, entities } from '@@utils/index.js';

interface Params {
    guildId: GuildResolvable,
    discordId: UserResolvable
};

async function create(req: Request, res: AuthenticatedResponse<Params>, next: NextFunction) {

    const { auth, params } = res.locals;
    const { guildId, discordId } = params;

    if(auth.permissions === "USER") {
        return errors.sendResponse({ res, next, status: 401, message: "Unauthorized" });
    }

    const [guildSettings, settingsErr] = await entities.findOne<GuildSettings>(GuildSettings, {
        where: {
            guild_id: guildId as string
        }
    });

    if(settingsErr) {
        return errors.sendResponse({ res, status: 500, err: settingsErr, message: "Error Checking Guild Settings" });
    }

    if(!guildSettings) {
        return errors.sendResponse({ res, status: 404, message: "No Guild Settings Found" });
    }

    const [recordInsert, err] = await entities.insert<GuildCurrencyRecord>(GuildCurrencyRecord, {
        guild_id: guildId as string,
        discord_id: discordId as string,
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