const discordServices = require('../services/discordServices');
const usersDB = require('../models/UserModels/usersDB');
const discord_tokenDB = require('../models/discord_tokenDB');
const autodjDB = require('../models/autodjDB');
const issueToken = require('../middleware/issueToken');

const usersController = require('./dbControllers/usersController');
const discordTokensController = require('./dbControllers/discordTokensController');

const services = {};

// services.saveAutoDJSettings = (user, res) => {
//   autodjDB.save({
//     user_id: user.user_id,
//     redirect: 'f',
//     guild_id: '0'
//   })
//     .then(() => services.sendToken(user, res))
//     .catch(err => console.log(err));
// };

services.getUserByDiscordId = (req, res, next) => {
  usersDB.findByDiscordId(req.params.id)
    .then(user => {
      res.json({ message: "Getting User", data: user });
    })
    .catch(err => next(err));
};

services.handleLogout = (req, res, next) => {
  discord_tokenDB.deleteToken(req.body.discord_id)
    .then(() => {
      res.json({ message: 'Logging out...', data: {isLoggedIn: false} });
    })
    .catch(err => next(err));
};

services.login = (req, res, next) => {
    const loginData = {};

    discordServices.getToken(req.body.code)
    .then(discordToken => getDiscordUserInfo(discordToken.data))
    .catch(err => console.error(err));

    function getDiscordUserInfo(discordToken) {
        loginData.discordToken = discordToken;
        discordServices.getUserInfo(discordToken.access_token)
        .then(discordUser => checkForToken(discordUser.data))
        .catch(err => console.error(err));
    };

    function checkForToken(discordUser) {
        loginData.discordUser = discordUser;
        discordTokensController.getByDiscordId(discordUser.id, updateToken, () => {
            let data = {
                discord_id: discordUser.id,
                access_token: loginData.discordToken.access_token, 
                refresh_token: loginData.discordToken.refresh_token,
                expires_in: loginData.discordToken.expires_in
            };
            discordTokensController.save(data, checkForUser);
        });
    };

    function updateToken(token) {
        let data = {
            id: token.id,
            discord_id: loginData.discordUser.id,
            access_token: loginData.discordToken.access_token,
            refresh_token: loginData.discordToken.refresh_token,
            expires_in: loginData.discordToken.expires_in 
        };
        discordTokensController.update(data, checkForUser);
    };

    function checkForUser(token) {
        loginData.token = token;
        usersController.getByDiscordId(loginData.discordUser.id, sendToken, () => {
            let data = {
                discord_username: loginData.discordUser.username, 
                discord_id:  loginData.discordUser.id, 
                twitch_username: 'not connected',
                date: moment()
            };
            usersController.save(data, (user) => {
                // Save Default Settings
                // Call SendToken
            });
        });
    };

    function sendToken(user) {
        user.username = loginData.discordUser.username;
        user.discriminator = loginData.discordUser.discriminator;
        user.avatar = loginData.discordUser.avatar;
        issueToken(res, user);
    };
};

module.exports = services;
