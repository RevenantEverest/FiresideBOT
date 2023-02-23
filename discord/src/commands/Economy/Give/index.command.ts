import BigNumber from 'bignumber.js';
import {  SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';

import * as api from '../../../api/index.js';

import { ERROR_MESSAGES } from '../../../constants/index.js';
import { regex, errors } from '../../../utils/index.js';

async function Give({ bot, dispatch, args, guildSettings }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.GIVE.NO_ARGS);
    }

    const recipientId = dispatch.interaction?.options.getUser("user")?.id ?? regex.parseUserTag(args.join(" "));
    const amountToGive = dispatch.interaction?.options.getNumber("amount") ?? parseInt(args.join(" ").replace(regex.userRegex, "").split(" ")[0], 10);

    if(!recipientId) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.GIVE.NO_USER_MENTION);
    }

    if(!amountToGive) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.GIVE.NO_AMOUNT);
    }

    if(!Number.isInteger(amountToGive)) {
        return dispatch.reply(ERROR_MESSAGES.INVALID_INTEGER);
    }

    const [benefactorRecord, benefactorGetErr] = await api.guildCurrencyRecords.getByGuildIdAndDiscordId(dispatch, dispatch.author.id);

    if(benefactorGetErr || !benefactorRecord) {
        return;
    }

    const [recipientRecord, recipientGetErr] = await api.guildCurrencyRecords.getByGuildIdAndDiscordId(dispatch, recipientId);

    if(recipientGetErr || !recipientRecord) {
        return;
    }

    const benefactorBalance = new BigNumber(benefactorRecord.balance);
    const recipientBalance = new BigNumber(recipientRecord.balance);

    if(benefactorBalance.isLessThan(amountToGive)) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.GIVE.NOT_ENOUGH_CURRENCY);
    }

    const adjustedBenefactorBalance = benefactorBalance.minus(amountToGive).toString();
    const [benefactorRecordUpdate, benefactorUpdateErr] = await api.guildCurrencyRecords.update(dispatch, dispatch.author.id, adjustedBenefactorBalance);

    if(benefactorUpdateErr || !benefactorRecordUpdate) {
        return;
    }

    const adjustedRecipientBalance = recipientBalance.plus(amountToGive).toString();
    const [recipientRecordUpdate, recipientUpdateErr] = await api.guildCurrencyRecords.update(dispatch, recipientId, adjustedRecipientBalance);

    if(recipientUpdateErr || !recipientRecordUpdate) {
        return;
    }

    const recipient = dispatch.interaction?.options.getUser("user") ?? await bot.users.fetch(recipientId);

    return dispatch.reply(`${dispatch.author} gave ${recipient} ${amountToGive.toLocaleString()} ${guildSettings.currency_name}`);

    /* Handle evenantual Log embed */
};

export const config: CommandConfig = {
    aliases: [],
    permissions: [],
    description: "Give some of your server currency to someone else",
    example: "give @Revenanteverest 100"
};

export const slashCommand = new SlashCommandBuilder()
.setName("give")
.setDescription(config.description)
.addUserOption(option => 
    option
    .setName("user")
    .setDescription("Who you'd like to give the currency to")
)
.addNumberOption(option =>
    option
    .setName("amount")
    .setDescription("the amount you'd like to give")
    .setRequired(true)    
);

export default Give;