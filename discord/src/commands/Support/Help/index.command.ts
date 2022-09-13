import Discord, { Client, MessageEmbedAuthor } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams, CommandFile, CommandDispatch } from '../../../types/commands.js';
import { PaginatedEmbed, PaginatedEmbedPage } from '../../../types/embeds.js';

import sendFullHelpList from './sendFullHelpList/index.js';

import botConfig from '../../../config/index.js';
import { colors, embeds } from '../../../utils/index.js';
import sendCommandCategoryList from './sendCommandCategoryList/index.js';
import sendSingleCommand from './sendSingleCommand/index.js';

async function Help({ PREFIX, bot, dispatch, args }: CommandParams) {

    const helpSearch: string | undefined = dispatch.interaction?.options.getString("command") ?? args[0];
    const flavorText: string = "`<param>` is a required param and `[param]` is an optional param. For more information on a command use ?help <command>";

    if(!helpSearch) {
        return sendFullHelpList(bot, dispatch, flavorText);
    }

    const category = botConfig.categories.filter(category => {
        if(helpSearch.toLocaleLowerCase() === category.name.toLowerCase()) {
            return category;
        }
    })[0];

    const command = botConfig.commands.filter(command => {
        if(helpSearch.toLocaleLowerCase() === command.name.toLowerCase()) {
            return command;
        }
    })[0];

    if(category && !command) {
        return sendCommandCategoryList(bot, dispatch, category, flavorText);
    }
    else if(command && !category) {
        return sendSingleCommand(PREFIX, bot, dispatch, command, flavorText);
    }
    else {
        console.log("Edge Case...");
    }
};

export const config: CommandConfigParams = {
    aliases: [],
    description: "Displays a navigatable embed that displays all Fireside commands. If given a command, command alias or category, displays that respective information",
    example: "help Admin"
};

export const slashCommand = new SlashCommandBuilder()
.setName("help")
.setDescription(config.description.split(".")[0]) // Slash Command description length cannot exceed 100 characters
.addStringOption(option =>
    option
    .setName("command")
    .setDescription("Command or Category to display category command list or more information on a specific command")
    .setRequired(false)
);

export default Help;