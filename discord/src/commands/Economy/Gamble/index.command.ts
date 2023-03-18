import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';
import bignumber, { BigNumber } from 'bignumber.js';

import * as api from '../../../api/index.js';

import { common, errors } from '../../../utils/index.js';

async function Gamble({ dispatch, args, commandFile }: CommandParams) {
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

    const recordBalance = new BigNumber(record.balance);

    if(recordBalance.isLessThan(wager)) {
        return dispatch.reply("You can't bet what you don't have");
    }

    const RNG = common.RNG(100);
    const isWinner = RNG > 75;

    
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