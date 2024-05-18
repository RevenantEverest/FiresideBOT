import type { Message } from 'discord.js';
import type { Card } from './playingCards.js';

export interface BlackJackPlayerState {
    hand: Card[],
    value: number,
    title?: Message,
    cardDisplay?: Message,
    hasDoubledDown?: boolean,
    hasSurrendered?: boolean,
    hasNaturalBlackJack?: boolean
};

export interface BlackJackGameState {
    player: BlackJackPlayerState,
    dealer: BlackJackPlayerState,
    deck: Card[],
    wager: number,
    outcomeState?: BlackJackOutcomeState,
};

export type BlackJackOutcomeState = "PLAYER_BUST" | "PUSH" | "DEALER_BUST" | "DEALER_WIN" | "PLAYER_WIN" | "PLAYER_SURRENDER"; 
export type BlackJackCollectorReason = "DEALER_TURN" | "SURRENDER" | "PLAYER_BUST";