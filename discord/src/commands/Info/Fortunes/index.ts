import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';
import { Fortune } from '../../../types/entities/Fortune.js';
import { PaginatedEmbed } from '../../../types/embeds.js';
import { HandleReturn } from '../../../types/promises.js';
import { ApiPaginationOptions, GetPageResponse } from '../../../types/pagination.js';

import * as api from '../../../api/index.js';

import { colors, embeds, pagination, arrays, errors } from '../../../utils/index.js';
import { DEFAULTS } from '../../../constants/index.js';

async function Fortunes({ bot, dispatch }: CommandParams) {

    const [fortunes, err] = await api.fortunes.getByGuildId(dispatch.guildId, dispatch, {
        page: 1
    });

    if(err) {
        return errors.command({ bot, dispatch, err, errMessage: err.message, commandName: "" });
    }

    if(!fortunes) {
        return dispatch.reply("No Fortunes found");
    }

    const amountPerPage: number = 5;
    const paginatedEmbed: PaginatedEmbed = generatePaginatedEmbed(fortunes.results);

    function setFieldName(fortune: Fortune, index: number, startIndex: number): string {
        return `${(startIndex + index) + 1}. ${fortune.fortune} (ID: ${fortune.id})`;
    };

    function setFieldValue(fortune: Fortune): string {
        return `**Created By:** ${fortune.created_by}`;
    };

    function generatePaginatedEmbed(fortunes: Fortune[]): PaginatedEmbed {
        return {
            title: `**Fortunes**`,
            author: {
                iconURL: dispatch.guild.iconURL() ?? "",
                name: dispatch.guild.name
            },
            color: colors.steelPink,
            content: embeds.generatePaginatedEmbedFields<Fortune>({
                data: fortunes, 
                amountPerPage, 
                setFieldName, 
                setFieldValue
            })
        };
    };

    const partialOptions = pagination.generateBasicPagiationOptions<Fortune>(fortunes);  
    const paginationOptions: ApiPaginationOptions<Fortune> = {
        ...partialOptions,
        amountPerPage,
        getPage: async (page: number, data: Fortune[]): HandleReturn<GetPageResponse<Fortune>> => {
            const [res, err] = await api.fortunes.getByGuildId(dispatch.guildId, dispatch, {
                page
            });
    
            if(err) {
                errors.command({ bot, dispatch, err, errMessage: err.message, commandName: "Fortunes" });
                return [undefined, err];
            }
        
            if(!res) {
                return [undefined, new Error("No Fortunes Found")];
            }

            const maxDataFromPage = page * DEFAULTS.API_PAGINATION.LIMIT;
            const spliceStartIndex = Math.ceil(maxDataFromPage - DEFAULTS.API_PAGINATION.LIMIT);
            res.results = arrays.replaceElements(data, spliceStartIndex, res.results);

            const partialOptions = pagination.generateBasicPagiationOptions<Fortune>(res);
    
            return [{
                ...partialOptions,
                paginatedEmbed: generatePaginatedEmbed(data)
            }, undefined];
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