import type { GuildResolvable, UserResolvable } from 'discord.js';
import type { Request, AuthenticatedResponse, NextFunction } from '@@types/express.js';

import { GuildCurrencyRecord } from '@@entities/index.js';

import { errors, entities } from '@@utils/index.js';

interface Params {
    guildId: GuildResolvable,
    discordId: UserResolvable
};

async function getByGuildIdAndDiscordId(req: Request, res: AuthenticatedResponse<Params>, next: NextFunction) {

    const { auth, params } = res.locals;
    const { guildId, discordId } = params;

    if(auth.permissions === "USER" && auth.discord_id !== discordId) {
        return errors.sendResponse({ res, next, status: 401, message: "Unauthorized" });
    }

    const [record, err] = await entities.findOne<GuildCurrencyRecord>(GuildCurrencyRecord, {
        where: {
            guild_id: guildId as string,
            discord_id: discordId as string
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