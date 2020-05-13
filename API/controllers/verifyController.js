const jwt = require('jsonwebtoken');
const services = {};

services.verify = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader === 'undefined')
        return res.sendStatus(403);
    
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, process.env.TOKEN_SECRET, (err, authData)  => {
        if(err) return res.status(403).json({ error: "Invalid Token" });
        else return res.json({ data: authData });
    });
};

module.exports = services;