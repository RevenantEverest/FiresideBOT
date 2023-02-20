import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';
import { BlackJackPlayerState } from '../../../types/blackJack.js';

import deal from './deal/index.js';

import * as api from '../../../api/index.js';

import { ERROR_MESSAGES, PLAYING_CARDS } from '../../../constants/index.js';
import { arrays, errors } from '../../../utils/index.js';

async function BlackJack({ dispatch, args }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.BLACK_JACK.NO_ARGS);
    }

    const wager = dispatch.interaction?.options.getNumber("wager") || args[0];

    if(typeof wager != "number" && !Number.isInteger(parseInt(wager, 10))) {
        return dispatch.reply(ERROR_MESSAGES.INVALID_INTEGER);
    }

    let deck = arrays.shuffle(PLAYING_CARDS.CARDS);

    const playerDeal = deal(deck);
    deck = playerDeal.deck;
    
    const dealerDeal = deal(playerDeal.deck);
    deck = dealerDeal.deck;

    const player: BlackJackPlayerState = playerDeal.player;
    const dealer: BlackJackPlayerState = dealerDeal.player;
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