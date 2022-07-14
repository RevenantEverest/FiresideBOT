import Discord, { MessageReaction, User } from 'discord.js';
import { GuildMessage } from '../types/message';

export async function createReactionNavigator(message: GuildMessage, handleNext: Function, handlePrev: Function) {

    const navigatorEmojis = {
        next: "◀️",
        stop: "⏹️",
        prev: "▶️"
    };
    const collector = new Discord.ReactionCollector(message);

    collector.on("collect", async (reaction: MessageReaction, user: User) => {
        await message.react(navigatorEmojis.prev);
        await message.react(navigatorEmojis.stop);
        await message.react(navigatorEmojis.next);

        switch(reaction.emoji.name) {
            case navigatorEmojis.next:
                return handleNext();
            case navigatorEmojis.prev:
                return handlePrev();
            case navigatorEmojis.stop: 
                return collector.stop();
            default:
                return;
        };
    });   
    
    collector.on("end", async () => {
        message.reactions.removeAll();
    });
};