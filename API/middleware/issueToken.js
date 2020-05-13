const jwt = require('jsonwebtoken');

module.exports = (res, user) => {
    const payload = { 
        id: user.user_id, 
        username: user.username, 
        discriminator: user.discriminator,
        discord_id: user.discord_id, 
        avatar: user.avatar
    };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { 
        expiresIn: '12h'
    });
    payload.token = token;
    res.json({ data: payload });
};