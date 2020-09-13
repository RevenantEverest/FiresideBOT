const discordServices = require('../services/discordServices');
const issueAdminToken = require('../middleware/issueAdminToken');
const bot = require('../Discord_Bot');
const services = {};

services.loginAdmin = (req, res, next) => {
    let loginData = {};

    discordServices.getToken(req.body.code, process.env.DISCORD_BACKEND_REDIRECT)
    .then(discordToken => getDiscordUserInfo(discordToken.data))
    .catch(err => console.error(err));

    function getDiscordUserInfo(discordToken) {
        loginData.discordToken = discordToken;
        discordServices.getUserInfo(discordToken.access_token)
        .then(discordUser => validateUser(discordUser.data))
        .catch(err => console.error(err));
    };

    function validateUser(discordUser) {
        let supportServerMembers = bot.guilds.get("510673248107757579").members.array();
        let serverMember = supportServerMembers.filter(el => el.user.id === discordUser.id)[0];

        if(!serverMember) return res.status(403).json({ error: "Unauthorized User" });
        
        if(serverMember._roles.includes("518336120677728263")) discordUser.userstate = "admin";
        else if(serverMember._roles.includes("539817857681195029")) discordUser.userstate = "support";
        else return res.status(403).json({ error: "Unauthorized User" });

        sendToken(discordUser);
    };

    function sendToken(discordUser) {
        issueAdminToken(res, discordUser);
    };
};

module.exports = services;