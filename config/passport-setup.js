const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;

passport.use(new DiscordStrategy({

},
function(accessToken, refreshToken, profile, cb) => {
  if(err)
    return done(err);


}))
