import { Client } from 'discord.js';
import { CommandFile, CommandDispatch, CommandCategory } from '../../../../types/commands.js';
import { PaginatedEmbed } from '../../../../types/embeds.js';

import botConfig from '../../../../config/index.js';

import { colors, embeds } from '../../../../utils/index.js';

function sendCommandCategoryList(bot: Client, dispatch: CommandDispatch, category: CommandCategory, flavorText: string) {
    
    const commands: CommandFile[] = botConfig.commands.filter(command => command.category === category.name);
    const amountPerPage: number = 5;

    const paginatedEmbed: PaginatedEmbed = {
        flavorText,
        pages: embeds.generatePaginatedEmbedPages<CommandFile>({
            title: (index: number) => {
                const maxPages = Math.ceil(commands.length / amountPerPage);
                const pageCount = maxPages > 1 ? `${index + 1}/${maxPages}` : "";

                return `${category.name} \`(${commands.length} commands)\` ${pageCount}`;
            },
            description: `${category.description}\n\u200b`,
            author: {
                name: "Help Command List",
                iconURL: bot.user?.avatarURL({ dynamic: true }) ?? ""
            },
            color: colors.fuchsia,
            data: commands,
            amountPerPage,
            setFieldName: (command: CommandFile): string => {
                return command.displayName;
            },
            setFieldValue: (command: CommandFile): string => {
                return command.description;
            }
        }),
    };

    return embeds.pagination<CommandFile>(dispatch, paginatedEmbed);
};

export default sendCommandCategoryList;