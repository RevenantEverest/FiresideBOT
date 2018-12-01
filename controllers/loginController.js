const discordServices = require('../services/discordServices');
const usersDB = require('../models/UserModels/usersDB');
const tokenDB = require('../models/tokenDB');
const logger = require('../services/logger');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

//Add Route for logging in with token

//Move Frontend Discord API calls to backend
//Handle potential 401 Discord API status codes
//Double Check Flow

module.exports = {
  handleLogin(req, res, next) {
    try {
      this.handleToken(req.body.code, res);
    }
    catch(err) {
      next(err);
    }
  },
  handleToken(code, res) {
    discordServices.getToken(code)
      .then(results => {
        this.getDiscordUserInfo(results.data, res);
        
      })
      .catch(err => {
        logger.apiErrorLogger({ 
          route: '/login/discord/token', 
          message: 'Failed at Handle Token', 
          status_code: err.status_code 
        });
      })
  },
  getDiscordUserInfo(tokenData, res) {
    discordServices.getUserInfo(tokenData.access_token)
      .then(discordUser => {
        this.checkForUser(discordUser.data, res);
        this.storeTokenInfo(tokenData, discordUser);
      })
      .catch(err => {
        //Log Error
        console.log(err);
      })
  },
  checkForUser(discordUser, res) {
    usersDB.findByDiscordId(discordUser.id)
      .then(user => this.sendToken(user, res))
      .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
          this.saveUser(discordUser, res);
        else console.log(err);
        //Log Error
      })
  },
  saveUser(discordUser, res) {
    // Add User to Database
    usersDB.save({ 
      discord_username: discordUser.username, 
      discord_id:  discordUser.id, 
      twitch_username: 'not connected'
    })
      .then(user => this.saveAutoDJSettings(user, res))
      .catch(err => {
        //Log Error
        console.log(err);
      });
  },
  saveAutoDJSettings(user, res) {
    autodjDB.save({
      user_id: user.user_id,
      redirect: 'f',
      guild_id: '0'
    })
      .then(() => this.sendToken(user, res))
      .catch(err => {
        //Log Error
        console.log(err);
      })
  },
  storeTokenInfo(tokenData, discordUser) {
    tokenDB.save({ 
      discord_id: discordUser.id,
      access_token: tokenData.access_token, 
      refresh_token: tokenData.refreshToken 
    })
      .catch((err) => {
        //Log Error
        console.log(err);
      })
  },
  sendToken(user, res) {
    tokenDB.findByDiscordId(user.discord_id)
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
        console.log(err);
      })
  }
}
