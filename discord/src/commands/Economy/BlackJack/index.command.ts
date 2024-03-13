import type { Collection, Message, MessageReaction, User, Snowflake } from 'discord.js';
import type { CommandParams, CommandConfig } from '@@types/commands.js';
import type { BlackJackCollectorReason } from '@@types/blackJack.js';

import Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import BigNumber from 'bignumber.js';

import { setupGame, hit, handleDealer, updateCardDisplay, calculateWagerChange } from './support/index.js';

import * as api from '@@api/index.js';

import { EMOJIS, ERROR_MESSAGES } from '@@constants/index.js';
import { errors } from '../../../utils/index.js';

async function BlackJack({ dispatch, args, commandFile }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.BLACK_JACK.NO_ARGS);
    }

    const wager = dispatch.interaction?.options.getNumber("wager") || parseInt(args[0], 10);

    if(typeof wager != "number" && !Number.isInteger(wager)) {
        return dispatch.reply(ERROR_MESSAGES.INVALID_INTEGER);
    }

    const gameState = await setupGame(dispatch, wager);

    const collector = new Discord.ReactionCollector(gameState.player.cardDisplay as Message, {
        time: 5 * 60000,
        dispose: true
    });

    collector.on("collect", handleReaction);
    collector.on('end', handleCollectorEnd);

    async function handleReaction(reaction: MessageReaction, user: User) {
        if(user.bot) return;
        const reactionEmoji = reaction.emoji.id ? `<:${reaction.emoji.name}:${reaction.emoji.id}>` : reaction.emoji.name;

        switch(reactionEmoji) {
            case EMOJIS.HIT:
                const hitReturn = hit(gameState.player, gameState.deck);
                gameState.deck = hitReturn.deck;
                gameState.player = hitReturn.player;

                await updateCardDisplay(gameState.player);

                if(gameState.player.value > 21) {
                    return collector.stop("PLAYER_BUST" as BlackJackCollectorReason);
                }
                else if(gameState.player.value === 21) {
                    return collector.stop("DEALER_TURN" as BlackJackCollectorReason);
                }
                break;
            case EMOJIS.DOUBLE_DOWN:
                const doubleDownHitReturn = hit(gameState.player, gameState.deck);
                gameState.deck = doubleDownHitReturn.deck;
                gameState.player = doubleDownHitReturn.player;
                gameState.player.hasDoubledDown = true;

                await updateCardDisplay(gameState.player);

                if(gameState.player.value > 21) {
                    return collector.stop("PLAYER_BUST" as BlackJackCollectorReason);
                }

                return collector.stop("DEALER_TURN" as BlackJackCollectorReason);
            case EMOJIS.WHITE_FLAG:
                if(gameState.player.hand.length > 2) return;
                gameState.player.hasSurrendered = true;
                return collector.stop("SURRENDER" as BlackJackCollectorReason);
            case EMOJIS.STAY:
                return collector.stop("DEALER_TURN" as BlackJackCollectorReason);
        };
    };

    async function handleCollectorEnd(collected: Collection<Snowflake, MessageReaction>, reason: BlackJackCollectorReason) {
        gameState.player.cardDisplay?.reactions.removeAll();

        switch(reason) {
            case "PLAYER_BUST":
                gameState.outcomeState = "PLAYER_BUST";
                break;
            case "SURRENDER":
                gameState.outcomeState = "PLAYER_SURRENDER";
                break;
            case "DEALER_TURN":
                gameState.outcomeState = await handleDealer(gameState);
                break;
        }

        const payout = calculateWagerChange(gameState);
        const payoutMessage = await dispatch.channel.send("Calculating payout...");
        const [recordFind, recordFindErr] = await api.guildCurrencyRecords.getOrSave(dispatch, dispatch.author.id);

        if(recordFindErr || !recordFind) {
            return errors.commandApi({
                dispatch,
                err: recordFindErr,
                commandFile,
                resource: recordFind,
                missingResourceMessage: "Unable to find Currency Record"
            });
        }

        const updatedBalance = new BigNumber(recordFind.balance).plus(payout);
        const [recordUpdate, recordUpdateErr] = await api.guildCurrencyRecords.update(dispatch, dispatch.author.id, updatedBalance.toString());

        if(recordUpdateErr || !recordUpdate) {
            return errors.commandApi({
                dispatch,
                err: recordUpdateErr,
                commandFile,
                resource: recordUpdate,
                missingResourceMessage: "Unable to update Currency Record"
            });
        }

        switch(gameState.outcomeState) {
            case "PLAYER_BUST":
                payoutMessage.edit(`**BUST** You Lose **${gameState.wager.toLocaleString()}**`);
                break;
            case "PLAYER_SURRENDER":
                payoutMessage.edit(`You surrender and lose **${(payout * payout).toLocaleString()}**`);
                break;
            case "DEALER_WIN":
                payoutMessage.edit(`**Dealer Wins** You lose **${gameState.wager.toLocaleString()}**`);
                break;
            case "DEALER_BUST":
                payoutMessage.edit(`**Dealer Busts** You win! and have been paid out **${payout.toLocaleString()}**`);
                break;
            case "PUSH":
                payoutMessage.edit(`**Push (Tie)** your original wager of **${gameState.wager.toLocaleString()}** has been returned`);
                break;
        }
    };
};

export const config: CommandConfig = {
    aliases: ["bj"],
    permissions: [],
    description: "Play a round of Black Jack using your server currency",
    example: "blackjack 10"
};

export const slashCommand = new SlashCommandBuilder()
.setName("blackjack")
.setDescription(config.description)
.addNumberOption(option => 
    option
    .setName("wager")
    .setDescription("The amount you'd like to bet")
    .setRequired(true)    
)

export default BlackJack;