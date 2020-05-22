const Discord = require('discord.js');
const currencyRecordsController = require('../../controllers/dbControllers/discordCurrencyController');
const playingCards = require('../utils/playingCards');
const utils = require('../utils/utils');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify an amount to wager");
    if(!Number.isInteger(parseInt(args[1], 10))) 
        return message.channel.send("Please specify an integer value to wager");
    else if(parseInt(args[1], 10) <= 0) return message.channel.send("Minimum bet is 1");

    let player = {};
    let dealer = {};
    let wager = parseInt(args[1], 10);
    const cards = await getDeck();
    
    let data = { guild_id: message.guild.id, discord_id: message.author.id };
    currencyRecordsController.getByDiscordIdAndGuildId(bot, message, "BlackJack", data, checkBalance, () => {
        return message.channel.send("You can't bet what you don't have");
    });

    async function checkBalance(balance) {
        if(parseInt(balance.currency, 10) < wager) return message.channel.send("You can't bet what you don't have");

        balance.currency = parseInt(balance.currency, 10) - wager;
        currencyRecordsController.update(bot, message, "BlackJack", balance, (uBalance) => {
            player.balance = uBalance;
            deal();
        });
    };

    async function getDeck() {
        let deck = [];
        playingCards.cards.forEach(el => deck.push(el));
        return utils.shuffle(deck);
    };

    async function deal() {
        dealer.hand = [cards.shift(), cards.shift()];
        dealer.value = await calculateValue(dealer.hand);

        player.hand = [cards.shift(), cards.shift()];
        player.value = await calculateValue(player.hand);

        setup();
    };

    async function setup() {
        await message.channel.send("**Dealers Hand:**")
        .then(dealerTitle => dealer.title = dealerTitle);
        await message.channel.send(`${playingCards.back}${dealer.hand[1].id}`)
        .then(dealerMessage => dealer.message = dealerMessage);
        
        await message.channel.send(`**Your Hand:** (${player.value})`)
        .then(playerTitle => player.title = playerTitle);
        await message.channel.send(`${player.hand[0].id}${player.hand[1].id}`)
        .then(async playerMessage => {
            player.message = playerMessage;
            await playerMessage.react("👇"); // Hit
            await playerMessage.react("✋"); // Hold
            await playerMessage.react("711093865788211240"); // Double Down
            await playerMessage.react("🏳️") // Surrender
            play();
        });
    };

    async function calculateValue(hand) {
        let value = 0;
        let aceAmount = 0;
        hand.forEach(card => {
            if(card.name === "King" || card.name === "Jack" || card.name === "Queen")
                value = value + 10;
            if(Number.isInteger(parseInt(card.name, 10)))
                value = value + parseInt(card.name, 10);
            if(card.name === "Ace")
                aceAmount++;
        });

        if(aceAmount > 0) {
            for(let i = 0; i < aceAmount; i++) {
                if(value + 11 > 21) value = value + 1;
                else value = value + 11;
            }
        }

        return value;
    };

    async function hit(isDealer) {
        isDealer ? dealer.hand.push(cards.shift()) : player.hand.push(cards.shift());
        isDealer ? dealer.value = await calculateValue(dealer.hand) : player.value = await calculateValue(player.hand);
        isDealer ? updateHand(dealer, true) : updateHand(player, false);

    };

    async function updateHand(participant, isDealer) {
        let display = "";
        participant.hand.forEach(el => {
            display += el.id;
        });
        
        let newTitle = `**${isDealer ? "Dealer's Hand" : "Your Hand"}** (${participant.value})`;
        await participant.message.edit(display).catch(err => console.log(err));
        await participant.title.edit(newTitle).catch(err => console.log(err));
    };

    async function play() {
        const r_collector = new Discord.ReactionCollector(player.message, r => r.users.array()[r.users.array().length - 1].id === message.author.id, { time: (options.time * 300000) });

        r_collector.on('collect', async (reaction, user) => {
            if(reaction.users.array()[reaction.users.array().length - 1].id === bot.user.id) return;

            if(reaction.emoji.name === "👇") {
                await hit(false);
                if(player.value > 21) {
                    message.channel.send(`**BUST** You Lose ${player.doubleDown ? wager * 2 : wager}`);
                    return r_collector.stop();
                }
                else if(player.value === 21) {
                    startDealer();
                    return r_collector.stop();
                }
            }

            if(reaction.emoji.name === "DoubleDown") {
                await hit(false);
                player.doubleDown = true;

                if(player.value > 21) {
                    message.channel.send(`**BUST** You Lose ${player.doubleDown ? wager * 2 : wager}`);
                    return r_collector.stop();
                }

                player.balance.currency = parseInt(player.balance.currency) - wager;
                currencyRecordsController.update(bot, message, "BlackJack", player.balance, (uBalance) => {
                    player.balance = uBalance;
                    startDealer();
                    return r_collector.stop();
                });
            }

            if(reaction.emoji.name === "🏳️") {
                if(player.hand.length > 2) return;
                handleSurrender();
                return r_collector.stop();
            }
            
            if(reaction.emoji.name === "✋") {
                startDealer();
                return r_collector.stop();
            }
        });
        r_collector.on('end', e => {
            if(message.channel.type === "dm") return;
            
            let permissions =  new Discord.Permissions(message.channel.permissionsFor(bot.user).bitfield);
            if(!permissions.has("MANAGE_MESSAGES")) return;
            player.message.clearReactions();
        });
    };

    async function startDealer() {
        updateHand(dealer, true);
        dealer.value = await calculateValue(dealer.hand);
        handleDealer();
    };

    async function handleDealer() {
       if(dealer.value > player.value && dealer.value <= 21) 
            return message.channel.send(`**Dealer Wins** You lose ${player.doubleDown ? wager * 2 : wager}`);
        else if(dealer.value > 21) 
            return handleWinnings("**Dealer Busts** You win!");
        else if(dealer.value === player.value) 
            return handleWinnings("**Push** Tie");     

        await hit(true);
        handleDealer();
    };

    async function handleWinnings(winningText) {
        let payout = 0;
        if(player.value > dealer.value && player.doubleDown)
            payout = wager + (wager * 2);
        else if(player.value === 21 && dealer.value !== 21 && !player.doubleDown)
            payout = wager + (wager * 1.5);
        else if (player.value === dealer.value)
            payout = wager;
        else payout = wager + (wager * 1);

        player.balance.currency = parseInt(player.balance.currency, 10) + payout;
        currencyRecordsController.update(bot, message, "BlackJack", player.balance, () => {
            message.channel.send(winningText + ` and have been paid out **${payout.toLocaleString()}**`);
        });
    };

    async function handleSurrender() {
        player.balance.currency = parseInt(player.balance.currency, 10) + (wager / 2);
        currencyRecordsController.update(bot, message, "BlackJack", player.balance, () => {
            return message.channel.send(`You surrender and lose **${wager / 2}**`);
        });
    };
};

module.exports.config = {
    name: 'blackjack',
    d_name: 'BlackJack',
    aliases: ['bj'],
    category: 'Economy',
    desc: 'Plays a game of Black Jack',
    example: 'Black Jack 20'
};