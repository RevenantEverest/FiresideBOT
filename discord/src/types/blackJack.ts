import { Card } from './playingCards.js';

export interface BlackJackPlayerState {
    hand: Card[],
    value: number
};