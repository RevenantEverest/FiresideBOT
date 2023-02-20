import { Card } from '../../../../types/playingCards.js';

function calculateValue(hand: Card[]) {
    let value = 0;
    let hasAce = false;

    hand.forEach(card => {
        const cardValue = parseInt(card.name, 10);

        if(card.name === "Ace") {
            hasAce = true;
        }

        if(card.name === "King" || card.name === "Queen" || card.name === "Jack") {
            value += 10;
        }

        if(Number.isInteger(cardValue)) {
            value += cardValue;
        }
    });

    if(hasAce) {
        if(value + 11 > 21) {
            value += 1;
        }
        else {
            value += 11;
        }
    }

    return value;
};

export default calculateValue;