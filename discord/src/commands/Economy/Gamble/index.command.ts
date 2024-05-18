import type { CommandParams, CommandConfig } from '@@types/commands.js';

import { SlashCommandBuilder } from '@discordjs/builders';
import BigNumber from 'bignumber.js';

import * as api from '@@api/index.js';

import { common, errors } from '@@utils/index.js';

async function Gamble({ dispatch, args, commandFile, guildSettings }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return;
    }

    const wager = dispatch.interaction?.options.getNumber("wager") ?? parseInt(args[0], 10);

    if(!Number.isInteger(wager)) {
        return;
    }

    const [record, getErr] = await api.guildCurrencyRecords.getByGuildIdAndDiscordId(dispatch, dispatch.author.id);

    if(getErr || !record) {
        return errors.commandApi({
            dispatch, 
            commandFile,
            err: getErr,
            resource: record,
            missingResourceMessage: "No Currency Record Found"
        });
    }

    const recordBalance = BigNumber(record.balance);

    if(recordBalance.isLessThan(wager)) {
        return dispatch.reply("You can't bet what you don't have");
    }

    const RNG = common.RNG(100);
    const isWinner = RNG > 65; // 35% chance to win
    const payout = isWinner ? wager : wager * -1;
    const updatedBalance = recordBalance.plus(payout);
    
    const [recordUpdate, recordUpdateErr] = await api.guildCurrencyRecords.update(dispatch, dispatch.author.id, updatedBalance.toString());

    if(recordUpdateErr || !recordUpdate) {
        return errors.commandApi({
            dispatch,
            err: recordUpdateErr,
            commandFile,
            resource: recordUpdate,
            missingResourceMessage: "Unable to update Currency Record"
        });
    }

    const authorUsername = dispatch.author;
    const isWinnerText = isWinner ? "won" : "lost";
    const currencyName = guildSettings.currency_name;
    const payoutText = wager.toLocaleString();
    const updatedBalanceText = updatedBalance.toString();

    return dispatch.reply(`
        **${authorUsername}** rolled a **${RNG}** and ${isWinnerText} **${payoutText} ${currencyName}** and now has **${updatedBalanceText} ${currencyName}**
    `);
};

export const config: CommandConfig = {
    aliases: [],
    permissions: [],
    description: "Basic gamble. Wager an amount of money and either lose it or double it",
    example: "gamble 10"
};

export const slashCommand = new SlashCommandBuilder()
.setName("gamble")
.setDescription(config.description)
.addNumberOption(option => 
    option
    .setName("wager")
    .setDescription("The amount you want to bet")
    .setRequired(true)
);

export default Gamble;