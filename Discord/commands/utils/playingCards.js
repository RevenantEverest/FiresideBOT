const hearts = [
    { name: "Ace", suit: "Hearts", id: "<:AH:711053023710937099>" },
    { name: "2", suit: "Hearts", id: "<:2H:711053293270597764>" },
    { name: "3", suit: "Hearts", id: "<:3H:711053023471861771>" },
    { name: "4", suit: "Hearts", id: "<:4H:711053023702417448>" },
    { name: "5", suit: "Hearts", id: "<:5H:711053023409078333>" },
    { name: "6", suit: "Hearts", id: "<:6H:711053023732039680>" },
    { name: "7", suit: "Hearts", id: "<:7H:711053023765332010>" },
    { name: "8", suit: "Hearts", id: "<:8H:711053023463473197>" },
    { name: "9", suit: "Hearts", id: "<:9H:711053293593559070>" },
    { name: "10", suit: "Hearts", id: "<:10H:711053023753011291>" },
    { name: "Jack", suit: "Hearts", id: "<:JH:711053023710937128>" },
    { name: "Queen", suit: "Hearts", id: "<:QH:711053023778046042>" },
    { name: "King", suit: "Hearts", id: "<:KH:711053023639765033>" },
];

const clubs = [
    { name: "Ace", suit: "Clubs", id: "<:AC:711050683176189994>" },
    { name: "2", suit: "Clubs", id: "<:2C:711050683755003974>" },
    { name: "3", suit: "Clubs", id: "<:3C:711050683054293014>" },
    { name: "4", suit: "Clubs", id: "<:4C:711050683540832336>" },
    { name: "5", suit: "Clubs", id: "<:5C:711050683331248138>" },
    { name: "6", suit: "Clubs", id: "<:6C:711050682987446344>" },
    { name: "7", suit: "Clubs", id: "<:7C:711050683314339885>" },
    { name: "8", suit: "Clubs", id: "<:8C:711050683360608356>" },
    { name: "9", suit: "Clubs", id: "<:9C:711050683394031707>" },
    { name: "10", suit: "Clubs", id: "<:10C:711050683192836158>" },
    { name: "Jack", suit: "Clubs", id: "<:JC:711050683285241907>" },
    { name: "Queen", suit: "Clubs", id: "<:QC:711050683465465927>" },
    { name: "King", suit: "Clubs", id: "<:KC:711050683553546280>" },
];

const diamonds = [
    { name: "Ace", suit: "Diamonds", id: "<:AD:711052858543570995>" },
    { name: "2", suit: "Diamonds", id: "<:2D:711052858539376672>" },
    { name: "3", suit: "Diamonds", id: "<:3D:711052858581057557>" },
    { name: "4", suit: "Diamonds", id: "<:4D:711052858677788822>" },
    { name: "5", suit: "Diamonds", id: "<:5D:711052858627194882>" },
    { name: "6", suit: "Diamonds", id: "<:6D:711052858283524167>" },
    { name: "7", suit: "Diamonds", id: "<:7D:711052858623262721>" },
    { name: "8", suit: "Diamonds", id: "<:8D:711052858619068446>" },
    { name: "9", suit: "Diamonds", id: "<:9D:711052858669137930>" },
    { name: "10", suit: "Diamonds", id: "<:10D:711052858924990484>" },
    { name: "Jack", suit: "Diamonds", id: "<:JD:711052858237255793>" },
    { name: "Queen", suit: "Diamonds", id: "<:QD:711052858673463307>" },
    { name: "King", suit: "Diamonds", id: "<:KD:711052858665205780>" },
];

const spades = [
    { name: "Ace", suit: "Spades", id: "<:AS:711050919080493137>" },
    { name: "2", suit: "Spades", id: "<:2D:711052858539376672>" },
    { name: "3", suit: "Spades", id: "<:3S:711050919080493077>" },
    { name: "4", suit: "Spades", id: "<:4S:711050919097401364>" },
    { name: "5", suit: "Spades", id: "<:5S:711050918782566422>" },
    { name: "6", suit: "Spades", id: "<:6S:711050919168704512>" },
    { name: "7", suit: "Spades", id: "<:7S:711050919218774086>" },
    { name: "8", suit: "Spades", id: "<:8S:711050918757400631>" },
    { name: "9", suit: "Spades", id: "<:9S:711050918887424061>" },
    { name: "10", suit: "Spades", id: "<:10S:711050919097270313>" },
    { name: "Jack", suit: "Spades", id: "<:JS:711050918866714686>" },
    { name: "Queen", suit: "Spades", id: "<:QS:711050919143538708>" },
    { name: "King", suit: "Spades", id: "<:KS:711050919206322206>" },
];

const cardBack = "<:CardBack:711081801283534940>";

const playingCards = [].concat.apply([], [hearts, clubs, diamonds, spades]);

module.exports = {
    cards: playingCards,
    back: cardBack
};