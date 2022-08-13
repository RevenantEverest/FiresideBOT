import Discord, { MessageReaction, User, Message } from 'discord.js';
import { PaginatedEmbed } from '../types/embeds.js';
import { ApiPaginationOptions, GetPageResponse } from '../types/pagination.js';

import { DEFAULTS } from '../constants/index.js';
import * as embeds from './embeds.js';

function setUpdatedPaginationOptions<T>(getPageRes: GetPageResponse<T>, paginationOptions: ApiPaginationOptions<T>): ApiPaginationOptions<T> {
    const { hasMore, data, nextPageIndex, prevPageIndex } = getPageRes;

    return {
        ...paginationOptions,
        hasMore, 
        data, 
        nextPageIndex, 
        prevPageIndex
    };
};

function getContentLength<T>(paginatedEmbed: PaginatedEmbed, paginationOptions?: ApiPaginationOptions<T>): number {
    if(paginationOptions) {
        return Math.ceil(paginationOptions?.count / paginationOptions?.amountPerPage) - 1;
    }

    return paginatedEmbed.content.length - 1;
};

export async function createReactionNavigator<T>(message: Message, index: number, paginatedEmbed: PaginatedEmbed, paginationOptions?: ApiPaginationOptions<T>) {
    const navigatorEmojis = {
        next: "▶️",
        stop: "⏹️",
        prev: "◀️"
    };

    await message.react(navigatorEmojis.prev);
    await message.react(navigatorEmojis.stop);
    await message.react(navigatorEmojis.next);

    const collector = new Discord.ReactionCollector(message, { 
        time: (paginatedEmbed.time ?? DEFAULTS.PAGINATED_EMBED_TIME) * 60000 
    });

    collector.on("collect", async (reaction: MessageReaction, user: User) => {
        if(user.bot) return;
        
        const apiRequestInterval = Math.ceil(DEFAULTS.API_PAGINATION.LIMIT / (paginationOptions?.amountPerPage ?? 0));

        switch(reaction.emoji.name) {
            case navigatorEmojis.next:

                if(index % apiRequestInterval - 1 === 0 && paginationOptions?.hasMore && paginationOptions.nextPageIndex) {
                    const { nextPageIndex } = paginationOptions;

                    const [res, err] = await paginationOptions.getPage(nextPageIndex, paginationOptions.data);

                    if(!res || err) {
                        return collector.stop();
                    }

                    paginationOptions = setUpdatedPaginationOptions<T>(res, paginationOptions);
                    paginatedEmbed = res.paginatedEmbed;
                }

                index === getContentLength(paginatedEmbed, paginationOptions) ? index = 0 : index++;
                break;
            case navigatorEmojis.prev:

                /*
                
                    Edge Case:

                    If a user naviagtes backwards, handle getting proper pagination page

                    If the user coninues to scroll back get more updated pages
                    Try to find a way to keep track of the pages called by checking against highest 
                
                */
                const adjustedIndex = index === getContentLength(paginatedEmbed, paginationOptions) ? 0 : index + 1;
                const shouldRequestPage = apiRequestInterval % adjustedIndex === 0;

                console.log("Checking conditonal => ", adjustedIndex, shouldRequestPage);
                console.log("Second check => ", paginationOptions?.data.length, paginationOptions?.count);

                if(paginationOptions && paginationOptions.data.length !== paginationOptions.count || shouldRequestPage && paginationOptions?.hasMore) {
                    const [res, err] = await paginationOptions.getPage(2, paginationOptions.data);

                    if(!res || err) {
                        return collector.stop();
                    }

                    paginationOptions = setUpdatedPaginationOptions<T>(res, paginationOptions);
                    paginatedEmbed = res.paginatedEmbed;
                }

                index === 0 ? index = getContentLength(paginatedEmbed, paginationOptions) : index--;
                break;
            case navigatorEmojis.stop: 
                return collector.stop();
            default:
                return;
        };

        const embed = embeds.generateEmbed(index, paginatedEmbed, paginationOptions);
        reaction.message.edit({
            content: paginatedEmbed.flavorText,
            embeds: [embed]
        });
    });   
    
    collector.on("end", async () => {
        message.reactions.removeAll();
    });
};