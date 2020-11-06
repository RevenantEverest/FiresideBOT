const jwt = require('jsonwebtoken');
const bot = require('../Discord_Bot');

module.exports = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    
    if(typeof bearerHeader === 'undefined')
        return res.sendStatus(403);
    
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, process.env.TOKEN_SECRET, (err, authData)  => {
        if(err) {
            console.error(err);
            return res.status(403).json({ error: "Invalid Token" });
        }

        let supportServerMembers = bot.guilds.get("510673248107757579").members.array();
        let serverMember = supportServerMembers.filter(el => el.user.id === authData.discord_id);
        
        if(!serverMember) return;
        
        if(serverMember[0]._roles.includes("518336120677728263")) return next();
        else if(serverMember[0]._roles.includes("539817857681195029")) return next();
        else return res.status(403).json({ error: "Invalid Token" });
    });
};