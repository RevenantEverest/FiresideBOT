const axios = require('axios');
const services = {};

services.getServersArray = () => {
    return axios.get("http://localhost:3005/servers");
};

module.exports = {
    index(req, res, next) {
        services.getServersArray()
        .then(servers => res.json({ data: servers.data.data }))
        .catch(err => next(err));
    },
    getOne(req, res, next) {
        services.getServersArray()
        .then(servers => res.json({ data: servers.data.data[req.params.id] }))
        .catch(err => next(err));
    },
    getByGuildId(req, res, next) {
        services.getServersArray()
        .then(servers => res.json({ data: servers.data.data.filter(el => el.guild_id === req.params.id) }))
        .catch(err => next(err));
    }
};