import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';
import { Fortune } from '../../../types/entities/Fortune.js';
import { PaginatedEmbed } from '../../../types/embeds.js';
import { HandleReturn } from '../../../types/promises.js';
import { ApiPaginationOptions, GetPageResponse } from '../../../types/pagination.js';

import * as api from '../../../api/index.js';

import { colors, embeds, pagination, errors } from '../../../utils/index.js';

async function Fortunes({ bot, dispatch, commandFile }: CommandParams) {

    const [fortunes, err] = await api.fortunes.getByGuildId(dispatch.guildId, dispatch, {
        page: 1
    });

    if(err) {
        return errors.command({ dispatch, err, errMessage: err.message, commandName: commandFile.displayName });
    }

    if(!fortunes) {
        return dispatch.reply("No Fortunes found");
    }

    const amountPerPage: number = 5;
    const paginatedEmbed: PaginatedEmbed = generatePaginatedEmbed(fortunes.results);

    function generatePaginatedEmbed(fortunes: Fortune[]): PaginatedEmbed {
        return {
            pages: embeds.generatePaginatedEmbedPages<Fortune>({
                title: `**Fortunes**`,
                author: {
                    iconURL: dispatch.guild.iconURL() ?? "",
                    name: dispatch.guild.name
                },
                color: colors.steelPink,
                data: fortunes, 
                amountPerPage, 
                setFieldName: (fortune: Fortune, index: number, startIndex: number): string => {
                    return `${(startIndex + index) + 1}. ${fortune.fortune} (ID: ${fortune.id})`;
                }, 
                setFieldValue: (fortune: Fortune): string => {
                    return `**Created By:** ${fortune.created_by}`;
                }
            })
        };
    };

    const partialOptions = pagination.generateBasicPaginationOptions<Fortune>(fortunes);  
    const paginationOptions: ApiPaginationOptions<Fortune> = {
        ...partialOptions,
        amountPerPage,
        getPage: async (page: number, data: Fortune[]): HandleReturn<GetPageResponse<Fortune>> => {
            const [paginatedRes, err] = await api.fortunes.getByGuildId(dispatch.guildId, dispatch, {
                page
            });
    
            if(err) {
                errors.command({ dispatch, err, errMessage: err.message, commandName: commandFile.displayName });
                return [undefined, err];
            }
        
            if(!paginatedRes) {
                return [undefined, new Error("No Fortunes Found")];
            }

            const getPageRes = pagination.formatGetPageResponse({ page, data, paginatedRes, generatePaginatedEmbed });

            return [getPageRes, undefined];
        }
    };

    return embeds.pagination<Fortune>(dispatch, paginatedEmbed, paginationOptions);
};

export const config: CommandConfigParams = {
    aliases: [],
    description: "Displays a list of custom Fortunes added to 8 Ball responses",
    example: ""
};

export const slashCommand = new SlashCommandBuilder()
.setName("fortunes")
.setDescription(config.description)

export default Fortunes;