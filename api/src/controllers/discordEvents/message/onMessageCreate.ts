import { Client, Message } from 'discord.js';
import { FindOneOptions } from 'typeorm';
import BigNumber from 'bignumber.js';

import { GuildSettings, GuildCurrencyRecord } from '../../../entities/index.js';

import { entities } from '../../../utils/index.js';

async function onMessageCreate(bot: Client, message: Message) {
    if(message.author.bot || message.channel.type === "DM" || !message.guildId) return;

    console.log("Updating...");

    /* Get Guild Settings */
    const settingFindOptions: FindOneOptions<GuildSettings> = {
        where: {
            guild_id: message.guildId
        }
    };
    const [guildSettings, settingsErr] = await entities.findOrSave<GuildSettings>(GuildSettings, settingFindOptions, {
        guild_id: message.guildId
    });

    if(settingsErr) {
        return console.error("Settings Err") // Handle Error
    }

    if(!guildSettings) {
        return console.error("No Settings") // Handle Error
    }

    /* Handle Updating Currency Record */
    const recordFindOptions: FindOneOptions<GuildCurrencyRecord> = {
        where: {
            guild_id: message.guildId,
            discord_id: message.author.id
        }
    };
    const [record, recordErr] = await entities.findOrSave<GuildCurrencyRecord>(GuildCurrencyRecord, recordFindOptions, {
        guild_id: message.guildId,
        discord_id: message.author.id,
        balance: guildSettings.currency_increase_rate.toString()
    });

    if(recordErr) {
        return console.error("Record Err", recordErr) // Handle Error 
    }

    if(!record) {
        return console.error("No record") // Handle Error
    }

    const updatedBalance = new BigNumber(record.balance).plus(guildSettings.currency_increase_rate);
    const [recordUpdate, recordUpdateErr] = await entities.update<GuildCurrencyRecord>(GuildCurrencyRecord, {
        ...record,
        balance: updatedBalance.toString()
    });

    if(recordUpdateErr) {
        return console.error("Record Update Err", recordUpdateErr) // Handle Error
    }

    if(!recordUpdate) {
        return console.error("No Record Update") // Handle Error
    }
};

export default onMessageCreate;