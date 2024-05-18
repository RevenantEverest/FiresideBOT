import type { CommandParams, CommandConfig } from '@@types/commands.js';

import { SlashCommandBuilder } from '@discordjs/builders';
import BigNumber from 'bignumber.js';

import * as api from '@@api/index.js';

import { ERROR_MESSAGES } from '@@constants/index.js';
import { regex, errors } from '@@utils/index.js';

async function RemoveCurrency({ dispatch, args, guildSettings, commandFile }: CommandParams) {
    
    const interaction = dispatch.interaction;

    if(!interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.REMOVE_CURRENCY.NO_ARGS);
    }

    let userMention = interaction?.options.getUser("user");

    if(!userMention && regex.hasUserTag(args.join(" "))) {
        const userMentionParse = regex.parseUserTag(args.join(" "));

        if(userMentionParse) {
            args = args.join(" ").replace(regex.userRegex, "").split(" ").filter(el => el != "");
            const guildMember = await dispatch.guild.members.fetch(userMentionParse);
            userMention = guildMember.user;
        }
    }

    if(!userMention) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.REMOVE_CURRENCY.NO_RECIPIENT);
    }

    const amount = interaction?.options.getNumber("amount") ?? parseInt(args[0], 10);

    if(!Number.isInteger(amount)) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.REMOVE_CURRENCY.INVALID_AMOUNT);
    }

    const [recordFind, recordFindErr] = await api.guildCurrencyRecords.getOrSave(dispatch, userMention.id);

    if(recordFindErr || !recordFind) {
        return errors.commandApi({
            dispatch,
            err: recordFindErr,
            commandFile,
            resource: recordFind,
            missingResourceMessage: "Unable to find Currency Record"
        });
    }

    const updatedBalance = new BigNumber(recordFind.balance).minus(amount);
    const isLessThanZero = updatedBalance.isLessThan(new BigNumber(0));
    const [recordUpdate, recordUpdateErr] = await api.guildCurrencyRecords.update(dispatch, userMention.id, isLessThanZero ? "0" : updatedBalance.toString());

    if(recordUpdateErr || !recordUpdate) {
        return errors.commandApi({
            dispatch,
            err: recordUpdateErr,
            commandFile,
            resource: recordUpdate,
            missingResourceMessage: "Unable to update Currency Record"
        });
    }

    await dispatch.reply(`<@${userMention.id}> has had **${amount.toLocaleString()} ${guildSettings.currency_name}** taken from them by <@${dispatch.author.id}>`);
};

export const config: CommandConfig = {
    aliases: ["rc"],
    permissions: ["ADMINISTRATOR"],
    description: "Takes away currency from a user",
    example: "removecurrency @RevenantEverest 1000"
};

export const slashCommand = new SlashCommandBuilder()
.setName("removecurrency")
.setDescription(config.description)
.addNumberOption(option =>
    option
    .setName("amount")
    .setDescription("The amount of server currency you'd like to remove")
    .setRequired(true)
)
.addUserOption(option =>
    option
    .setName("user")
    .setDescription("Who you'd like to take the server currency from")
    .setRequired(true)
);

export default RemoveCurrency;