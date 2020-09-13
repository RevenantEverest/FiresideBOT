const jwt = require('jsonwebtoken');

module.exports = (res, user) => {
    const payload = {  
        username: user.username, 
        discriminator: user.discriminator,
        discord_id: user.id, 
        avatar: user.avatar,
        userstate: user.userstate
    };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { 
        expiresIn: '12h'
    });
    payload.token = token;
    res.json({ data: payload });
};