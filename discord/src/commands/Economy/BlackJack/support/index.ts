import type { CommandDispatch } from '@@types/commands.js';
import type { Card } from '@@types/playingCards.js';
import type { 
    BlackJackPlayerState, 
    BlackJackGameState, 
    BlackJackOutcomeState 
} from '@@types/blackJack.js';

import type { BigNumber } from 'bignumber.js';

import { PLAYING_CARDS, EMOJIS } from '@@constants/index.js';
import { arrays } from '@@utils/index.js';

interface DealReturn {
    player: BlackJackPlayerState,
    deck: Card[]
};

export const OUTCOME_STATES: Record<BlackJackOutcomeState, string> = {
    "DEALER_BUST": "",
    "DEALER_WIN": "",
    "PLAYER_BUST": "",
    "PLAYER_WIN": "",
    "PLAYER_SURRENDER": "",
    "PUSH": ""
}; 

export function setupGameState(wager: number): BlackJackGameState {

    const initialDeck = arrays.shuffle(PLAYING_CARDS.CARDS);

    const playerDeal = deal(initialDeck, 2);
    const dealerDeal = deal(playerDeal.deck, 2);

    return {
        player: playerDeal.player,
        dealer: dealerDeal.player,
        deck: dealerDeal.deck,
        wager
    };
};

export function deal(deck: Card[], dealAmount: number): DealReturn {
    let player: BlackJackPlayerState = {
        hand: [],
        value: 0
    };
    
    for(let i = 0; i < dealAmount; i++) {
        const results = hit(player, deck);
        deck = results.deck;
        player = results.player
    };

    return { player, deck };
};

export function hit(participant: BlackJackPlayerState, deck: Card[]): DealReturn {
    const card = deck.shift();
    participant.hand.push(card as Card); // Force type since game should never go beyond 24 rounds
    participant.value = calculateValue(participant.hand);
    return { player: participant, deck };
};

export function calculateValue(hand: Card[]): number {
    const faceCards: string[] = ["King", "Queen", "Jack"];
    
    let hasAce = false;
    let value = 0;

    for(let i = 0; i < hand.length; i++) {
        const currentCard = hand[i];

        if(faceCards.includes(currentCard.name)) {
            value += 10;
        }
        else if(currentCard.name === "Ace") {
            hasAce = true;
        }
        else {
            const parsedCardValue = parseInt(currentCard.name, 10);
            if(Number.isInteger(parsedCardValue)) {
                value += parsedCardValue;
            }
        }
    }

    if(hasAce) {
        if((value + 11) > 21) {
            return value += 1;
        }

        return value += 11;
    }

    return value;
};

export async function setupGame(dispatch: CommandDispatch, wager: number): Promise<BlackJackGameState> {
    const initialDealerTitle = "**Dealers Hand:**";
    const initialPlayerTitle = "**Your Hand:**";

    const { dealer, player, ...gameState } = setupGameState(wager);
    const dealerHand = PLAYING_CARDS.CARD_BACK + dealer.hand[1].id;
    const playerHand = player.hand[0].id + "" + player.hand[1].id;
    
    /* Dealer Setup */
    dealer.title = await dispatch.channel.send(initialDealerTitle);
    dealer.cardDisplay = await dispatch.channel.send(dealerHand);

    /* Player Setup */
    player.title = await dispatch.channel.send(`${initialPlayerTitle} (${player.value})`);
    player.cardDisplay = await dispatch.channel.send(playerHand);

    if(player.value === 21) {
        player.hasNaturalBlackJack = true;
    }

    await player.cardDisplay.react(EMOJIS.HIT);
    await player.cardDisplay.react(EMOJIS.STAY);
    await player.cardDisplay.react(EMOJIS.DOUBLE_DOWN);
    await player.cardDisplay.react(EMOJIS.WHITE_FLAG);

    return {
        ...gameState,
        dealer,
        player,
        wager
    };
};

export async function updateCardDisplay(participant: BlackJackPlayerState, options?: { isDealer?: boolean }) {
    const isDealer = options?.isDealer;
    let display = "";
    participant.hand.forEach(el => display += el.id);
    
    let newTitle = `**${isDealer ? "Dealer's Hand" : "Your Hand"}** (${participant.value})`;
    await participant.cardDisplay?.edit(display).catch(err => console.log(err));
    await participant.title?.edit(newTitle).catch(err => console.log(err));
};

export async function handleDealer(gameState: BlackJackGameState): Promise<BlackJackOutcomeState> {
    const { dealer, player } = gameState;    
    let outcomeState: BlackJackOutcomeState | null = null;

    while(!outcomeState) {
        await updateCardDisplay(gameState.dealer, {
            isDealer: true
        });

        if(dealer.value > 21) {
            outcomeState = "DEALER_BUST"
        }
        else if(dealer.value > player.value) {
            outcomeState = "DEALER_WIN";
        }
        else if(dealer.value === player.value && dealer.value >= 17) {
            outcomeState = "PUSH";
        }
        else {
            const hitReturn = hit(gameState.dealer, gameState.deck);
            gameState.deck = hitReturn.deck;
            gameState.dealer = hitReturn.player;
        }
    };

    await updateCardDisplay(gameState.dealer, {
        isDealer: true
    });

    return outcomeState;
};

/**
 * Calculates either the increase or decrease of the currency record balance post game.
 * @param gameState 
 * @returns number
 */
export function calculateWagerChange(gameState: BlackJackGameState): number {
    const { player, outcomeState, wager } = gameState;

    const winningOutcomes: BlackJackOutcomeState[] = ["DEALER_BUST", "PLAYER_WIN"];
    const losingOutcomes: BlackJackOutcomeState[] = ["DEALER_WIN", "PLAYER_BUST"];

    if(outcomeState === "PUSH") {
        return 0;
    }

    if(outcomeState === "PLAYER_SURRENDER") {
        return (wager / 2) * -1;
    }
    
    if(winningOutcomes.includes(outcomeState as BlackJackOutcomeState)) {
        if(player.hasNaturalBlackJack) {
            return wager * 1.5;
        }

        return player.hasDoubledDown ? (wager * 2) : wager;
    }
    
    if(losingOutcomes.includes(outcomeState as BlackJackOutcomeState)) {
        const lossAmount = player.hasDoubledDown ? (wager * 2) : wager;
        return lossAmount * -1;
    }

    return 0;
};