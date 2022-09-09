import { Client, MessageEmbedAuthor } from 'discord.js';
import { CommandFile, CommandDispatch } from '../../../../types/commands.js';
import { PaginatedEmbed, PaginatedEmbedPage } from '../../../../types/embeds.js';

import botConfig from '../../../../config/index.js';

import { colors, embeds } from '../../../../utils/index.js';

function sendFullHelpList(bot: Client, dispatch: CommandDispatch, flavorText: string) {

    const commandCategories = botConfig.categories;
    const amountPerPage: number = 5;

    const paginatedEmbed: PaginatedEmbed = {
        pages: [],
        flavorText
    };

    const author: MessageEmbedAuthor = {
        name: "Help Command List",
        iconURL: bot.user?.avatarURL({ dynamic: true }) ?? ""
    };

    const introPage: PaginatedEmbedPage = {
        author,
        color: colors.fuchsia,
        content: {
            fields: [
                { name: "Welcome to the FiresideBOT Help Command", value: " Need immidiate help? Message Fireside to open a ticket" },
                { 
                    name: "Categories", 
                    value: commandCategories.map(category => category.name !== "Dev" && category.name).filter(Boolean).join(" **|** ") 
                },
                { 
                    name: "How To Use", 
                    value: "Use the reactions below to move back and forth through the menu", 
                    inline: true
                },
                { 
                    name: "More Info", 
                    value: "To get more info about a command or category use the help command again with the desired command or category afterwards\n`Example: ?help Music`",
                    inline: true
                },
            ]
        }
    };

    for(let i = 0; i < commandCategories.length; i++) {
        const category = commandCategories[i];
        const commands = botConfig.commands.filter(command => command.category === category.name);

        if(category.name === "Dev" || commands.length < 1) {
            continue;
        }

        const categoryPages = embeds.generatePaginatedEmbedPages<CommandFile>({
            title: (index: number) => {
                const maxPages = Math.ceil(commands.length / amountPerPage);
                const pageCount = maxPages > 1 ? `${index + 1}/${maxPages}` : "";

                return `${category.name} \`(${commands.length} commands)\` ${pageCount}`;
            },
            author,
            description: `${category.description}\n\u200b`,
            color: colors.fuchsia,
            data: commands,
            amountPerPage,
            setFieldName: (command: CommandFile): string => {
                return command.displayName;
            },
            setFieldValue: (command: CommandFile): string => {
                return command.description;
            }
        });

        paginatedEmbed.pages = [...paginatedEmbed.pages, ...categoryPages];
    };

    paginatedEmbed.pages.splice(0, 0, introPage);

    return embeds.pagination<CommandFile>(dispatch, paginatedEmbed);
};

export default sendFullHelpList;