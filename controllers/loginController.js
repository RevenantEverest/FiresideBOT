const discordServices = require('../services/discordServices');
const usersDB = require('../models/UserModels/usersDB');
const discord_tokenDB = require('../models/discord_tokenDB');
const autodjDB = require('../models/autodjDB');
const logger = require('../services/logger');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

//Add Route for logging in with token

//Move Frontend Discord API calls to backend
//Handle potential 401 Discord API status codes
//Double Check Flow

//Check if an access code is in DB
//Update if nesessary
//Check if Discord API has a 401 error to use refresh token

const services = {};

services.handleLogin = (req, res, next) => {
  try {
    services.handleToken(req.body.code, res);
  }catch(err) {
    //Log Error
    next(err);
  }
};

services.handleToken = (code, res) => {
  discordServices.getToken(code)
    .then(results => services.getDiscordUserInfo(results.data, res))
    .catch(err => {
      //Log Error
      console.log(err);
    })
};

services.getDiscordUserInfo = (tokenData, res) => {
  discordServices.getUserInfo(tokenData.access_token)
    .then(discordUser => {
      services.checkForUser(discordUser.data, res);
      services.checkForToken(tokenData, discordUser.data);
      // services.storeTokenInfo(tokenData, discordUser.data);
    })
    .catch(err => {
      //Log Error
      console.log(err);
      //Check for 401 Status Code
      //Use Refresh Token to get another access token
      //Update DB
    })
};

services.checkForUser = (discordUser, res) => {
  usersDB.findByDiscordId(discordUser.id)
    .then(user => services.sendToken(user, res))
    .catch(err => {
      if(err instanceof QRE && err.code === qrec.noData)
        services.saveUser(discordUser, res);
      else console.log(err);
      //Log Error
    })
},
services.saveUser = (discordUser, res) => {
  // Add User to Database
  usersDB.save({ 
    discord_username: discordUser.username, 
    discord_id:  discordUser.id, 
    twitch_username: 'not connected'
  })
    .then(user => services.saveAutoDJSettings(user, res))
    .catch(err => {
      //Log Error
      console.log(err);
    });
};

services.saveAutoDJSettings = (user, res) => {
  autodjDB.save({
    user_id: user.user_id,
    redirect: 'f',
    guild_id: '0'
  })
    .then(() => services.sendToken(user, res))
    .catch(err => {
      //Log Error
      console.log(err);
    })
};

services.checkForToken = (tokenData, discordUser) => {
  discord_tokenDB.findByDiscordId(discordUser.id)
    .catch(err => {
      if(err instanceof QRE && err.code === qrec.noData)
        services.storeTokenInfo(tokenData, discordUser);
      else console.log(err);
      //Log Error
    })
};

services.storeTokenInfo = (tokenData, discordUser) => {
  discord_tokenDB.save({ 
    discord_id: discordUser.id,
    access_token: tokenData.access_token, 
    refresh_token: tokenData.refresh_token,
    expires_in: tokenData.expires_in
  })
    .catch((err) => {
      //Log Error
      console.log(err);
    })
};

services.sendToken = (user, res) => {
  discord_tokenDB.findByDiscordId(user.discord_id)
    .then(tokenData => {
      res.json({
        message: "Sending Token",
        data: {
          access_token: tokenData.access_token,
          userData: user
        }
      })
    })
    .catch(err => {
      //Log Error
      console.error(err);
    })
};

services.getUserByDiscordId = (req, res, next) => {
  usersDB.findByDiscordId(req.params.id)
    .then(user => {
      res.json({ message: "Getting User", data: user });
    })
    .catch(err => {
      //Log Error
      next(err);
    })
};

services.handleLogout = (req, res, next) => {
  discord_tokenDB.deleteToken(req.params.id)
    .then(() => {
      res.status(200);
    })
    .catch(err => next(err));
};

module.exports = services;
