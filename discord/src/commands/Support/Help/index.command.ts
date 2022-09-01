import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams, CommandFile } from '../../../types/commands.js';
import { PaginatedEmbed } from '../../../types/embeds.js';

import botConfig from '../../../config/index.js';
import { colors, embeds } from '../../../utils/index.js';

async function Help({ dispatch }: CommandParams) {

    const commandCategories = botConfig.categories;
    const amountPerPage: number = 5;

    const paginatedEmbedArr: PaginatedEmbed[] = [];

    for(let i = 0; i < commandCategories.length; i++) {
        const category = commandCategories[i];
        const commands = botConfig.commands.filter(command => command.category === category.name);

        if(category.name === "Dev" || commands.length < 1) {
            continue;
        }

        const title = `Help - ${category.name}`;
        const color = colors.fuchsia;
        const commandContent = embeds.generatePaginatedEmbedFields<CommandFile>({
            data: commands,
            amountPerPage,
            setFieldName: (command: CommandFile): string => {
                return command.displayName;
            },
            setFieldValue: (command: CommandFile): string => {
                return command.description;
            }
        });

        for(let x = 0; x < commandContent.length; x++) {
            paginatedEmbedArr.push({ title, color, content: [commandContent[x]] });
        }
    };

    return embeds.pagination<CommandFile>(dispatch, paginatedEmbedArr);
};

/*

    Got tired here was my current train of thought:

    Update PaginatedEmbed type to use [pages] key that stores each page's embed content
    Update all areas to use this new pages key (ie embeds, reactions, fortunes, queue, etc)

*/

export const config: CommandConfigParams = {
    aliases: [],
    description: "Displays a navigatable embed that displays all Fireside commands. If given a command, command alias or category, displays that respective information",
    example: "help Admin"
};

export const slashCommand = new SlashCommandBuilder()
.setName("help")
.setDescription(config.description.split(".")[0]) // Slash Command description length cannot exceed 100 characters

export default Help;