import { Client, Guild } from 'discord.js';
import { FindOneOptions } from 'typeorm';

import { Guild as BotGuild, GuildSettings } from '../../../entities/index.js';
import { colors, entities, logs } from '../../../utils/index.js';

async function onGuildCreate(bot: Client, guild: Guild) {

    logs.log({ color: colors.warning, message: "Creating guild..." });

    const findOptions: FindOneOptions = {
        where: {
            guild_id: guild.id
        }
    };
    const [botGuild, botGuildErr] = await entities.findAndSaveOrUpdate<BotGuild>(BotGuild, findOptions, {
        guild_id: guild.id
    });

    if(botGuildErr) {
        return console.error(botGuildErr);
    }

    if(!botGuild) {
        return console.error("No Bot Guild Returned");
    }

    const [guildSettings, guildSettingsErr] = await entities.findAndSaveOrUpdate<GuildSettings>(GuildSettings, findOptions, {
        guild_id: guild.id
    });

    if(guildSettingsErr) {
        return console.error(guildSettingsErr);
    }

    if(!guildSettings) {
        return console.error("No Guild Settings Returned");
    }

    logs.log({ color: colors.success, message: "New Guild" });
};

export default onGuildCreate;