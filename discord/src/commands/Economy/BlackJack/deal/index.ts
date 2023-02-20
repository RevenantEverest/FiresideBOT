import { BlackJackPlayerState } from '../../../../types/blackJack.js';
import { Card } from '../../../../types/playingCards.js';
import calculateValue from '../calculateValue/index.js';
import hit from '../hit/index.js';

interface Return {
    player: BlackJackPlayerState,
    deck: Card[]
};

function deal(deck: Card[]): Return {
    let player: BlackJackPlayerState = {
        hand: [],
        value: 0
    };
    
    for(let i = 0; i < 2; i++) {
        const results = hit(player, deck);
        deck = results.deck;
        player = results.player
    };

    return { player, deck };
};

export default deal;