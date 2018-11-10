const express = require('express');
const loginRouter = express.Router();
const discordServices = require('../services/discordServices');
const usersDB = require('../models/UserModels/usersDB');
const autodjDB = require('../models/autodjDB');

loginRouter.route('/discord/token')
  .post((req, res, next) => {
    discordServices.getToken(req.body.code)
      .then(results => {
        discordServices.getUserInfo(results.data.access_token)
          .then(discord_user => {
            let Discord_Username = discord_user.data.username;
            let Discord_ID = discord_user.data.id;
            usersDB.seeIfDiscordIdExists(Discord_ID)
              .then(user => {
                if(user.count === '1') {
                  usersDB.findByDiscordId(Discord_ID)
                    .then(returningUser => {
                      res.json({
                        message: 'User Authenticated',
                        data: {
                          access_token: results.data.access_token,
                          token_type: results.data.token_type,
                          expires_in: results.data.expires_in,
                          refresh_token: results.data.refresh_token,
                          userData: returningUser
                        }
                      })
                    })
                    .catch(err => next(err));
                }else if(user.count === '0') {
                  usersDB.save({
                    discord_username: Discord_Username,
                    discord_id: Discord_ID,
                    twitch_username: 'not connected'
                  })
                  .then(savedUser => {
                    autodjDB.save({
                      user_id: savedUser.user_id,
                      redirect: 'f',
                      guild_id: 0
                    });
                    res.json({
                      message: 'User Authenticated',
                      data: {
                        access_token: results.data.access_token,
                        token_type: results.data.token_type,
                        expires_in: results.data.expires_in,
                        refresh_token: results.data.refresh_token,
                        userData: savedUser
                      }
                    })
                  })
                  .catch(err => next(err));
                }
              })
              .catch(err => next(err));
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
  })

loginRouter.route('/discord/user/:token')
  .get((req, res, next) => {
    discordServices.getUserInfo(req.params.token)
      .then(results => {
        usersDB.findByDiscordId(results.data.id)
          .then(user => {
            res.json({
              message: 'Getting User By Discord Id',
              data: user
            })
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
  })

module.exports = loginRouter;
