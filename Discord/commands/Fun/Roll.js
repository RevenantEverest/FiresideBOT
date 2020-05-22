module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send(`You rolled a **${(Math.floor(Math.random() * 100))}**`);
    if(args[1].toLowerCase().split("").includes("d")) return handleMulti();
    if(!Number.isInteger(parseInt(args[1], 10)) && args[1] != " ") return message.channel.send("Please specify a number.");
    if(Number.isInteger(parseInt(args[1], 10))) return message.channel.send(`You rolled a **${(Math.floor(Math.random() * args[1]).toLocaleString())}**`);

    async function handleMulti() {
        let rollArgs = args[1].split("d");
        let amount = parseInt(rollArgs[0], 10);
        let sideAmount = parseInt(rollArgs[1], 10);

        if(!Number.isInteger(amount)) return message.channel.send("Invalid Input");
        if(!Number.isInteger(sideAmount)) return message.channel.send("Invalid Input");

        let diceText = "";
        let sum = 0;
        for(let i = 0; i < amount; i++) {
            let roll = Math.floor(Math.random() * sideAmount);
            if(roll === 0) roll = 1;
            sum = sum + roll;
            diceText += `<:DnDDice:713410877323477032> ${roll.toLocaleString()} ${amount > 1 && i + 1 < amount ? "+" : ""} `;
        }
        
        if(amount > 1) diceText += `= ${sum.toLocaleString()}`;
        if(diceText.length > 2000) return message.channel.send("Exceeded Discord's 2,000 character message limit");
        message.channel.send(diceText);
    };
};

module.exports.config = {
    name: 'roll',
    d_name: 'Roll',
    aliases: ['dice'],
    params: { required: false, params: 'Number' },
    category: 'Fun',
    desc: 'Rolls any number sided dice (Default is 6)',
    example: 'roll 20'
};