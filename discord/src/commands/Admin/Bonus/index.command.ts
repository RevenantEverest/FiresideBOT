import type { CommandParams, CommandConfig } from '@@types/commands.js';

import { SlashCommandBuilder } from '@discordjs/builders';
import BigNumber from 'bignumber.js';

import * as api from '@@api/index.js';

import { ERROR_MESSAGES } from '@@constants/index.js';
import { regex, errors } from '@@utils/index.js';

async function Bonus({ dispatch, args, guildSettings, commandFile }: CommandParams) {

    const interaction = dispatch.interaction;

    if(!interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.BONUS.NO_ARGS);
    }

    let recipient = interaction?.options.getUser("recipient");

    if(!recipient && regex.hasUserTag(args.join(" "))) {
        const recipientParse = regex.parseUserTag(args.join(" "));

        if(recipientParse) {
            args = args.join(" ").replace(regex.userRegex, "").split(" ").filter(el => el !== "");
            const guildMember = await dispatch.guild.members.fetch(recipientParse);
            recipient = guildMember.user;
        }
    }
    
    if(!recipient) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.BONUS.NO_RECIPIENT);
    }

    const amount = interaction?.options.getNumber("amount") ?? parseInt(args[0], 10);

    if(!Number.isInteger(amount)) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.BONUS.INVALID_AMOUNT);
    }

    const [recordFind, recordFindErr] = await api.guildCurrencyRecords.getOrSave(dispatch, recipient.id);

    if(recordFindErr || !recordFind) {
        return errors.commandApi({
            dispatch,
            err: recordFindErr,
            commandFile,
            resource: recordFind,
            missingResourceMessage: "Unable to find Currency Record"
        });
    }

    const updatedBalance = new BigNumber(recordFind.balance).plus(amount);
    const [recordUpdate, recordUpdateErr] = await api.guildCurrencyRecords.update(dispatch, recipient.id, updatedBalance.toString());

    if(recordUpdateErr || !recordUpdate) {
        return errors.commandApi({
            dispatch,
            err: recordUpdateErr,
            commandFile,
            resource: recordUpdate,
            missingResourceMessage: "Unable to update Currency Record"
        });
    }

    await dispatch.reply(`<@${recipient.id}> has been given **${amount.toLocaleString()} ${guildSettings.currency_name}** by <@${dispatch.author.id}>`);

    /* 
        Check if guild logs are enabled, and if so send an embed about given bonus
        Optionally add a flag to add a message to log ex. bonus 100 @user -m They made me laugh
    */
};

export const config: CommandConfig = {
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Grants bonus currency to a user",
    example: "bonus @RevenantEverest 1000"
};

export const slashCommand = new SlashCommandBuilder()
.setName("bonus")
.setDescription(config.description)
.addNumberOption(option => 
    option
    .setName("amount")
    .setDescription("The amount of server currency you'd like to give")
    .setRequired(true)
)
.addUserOption(option =>
    option
    .setName("recipient")
    .setDescription("Who you'd like to give the server currency to")
    .setRequired(true)
);

export default Bonus;
