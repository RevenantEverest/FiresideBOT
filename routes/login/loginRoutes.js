const express = require('express');
const loginRouter = express.Router();
const discordServices = require('../../services/discordServices');

loginRouter.route('/discord/token')
  .post((req, res, next) => {
    console.log(req.body);
    console.log(req.body.code);
    discordServices.getToken(req.body.code)
      .then(results => {
          console.log(results.data);
          res.json({
            message: 'User Authenticated',
            data: {
              access_token: results.data.access_token,
              token_type: results.data.token_type,
              expires_in: results.data.expires_in,
              refresh_token: results.data.refresh_token
            }
          })
      })
      .catch(err => next(err));
  })

module.exports = loginRouter;
