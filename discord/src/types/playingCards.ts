import { EmojiResolvable } from 'discord.js';

export type FaceCard = "Ace" | "King" | "Queen" | "Jack";
export type NumberCard = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
export type CardSuit = "Hearts" | "Clubs" | "Diamonds" | "Spades";

export interface Card {
    name: FaceCard | NumberCard,
    suit: CardSuit,
    id: EmojiResolvable
};