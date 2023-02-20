import { BlackJackPlayerState } from '../../../../types/blackJack.js';
import { Card } from '../../../../types/playingCards.js';
import calculateValue from '../calculateValue/index.js';

function hit(player: BlackJackPlayerState, deck: Card[]) {
    player.hand.push(deck[0]);
    player.value = calculateValue(player.hand);
    return { player, deck: deck.slice(1, deck.length) };
};

export default hit;