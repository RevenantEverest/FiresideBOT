const services = {};

services.getLinearUserDiscord = async (bot, linearUser) => {

    switch(linearUser) {
        case "d800f88f-a378-4dd7-9a89-ce1698d50f45":
            return bot.users.fetch("163346982709100546");
        default:
            return { username: "Linear App", avatarURL: () => ("https://i.imgur.com/hnL8LTj.png") };
    }
};

module.exports = services;