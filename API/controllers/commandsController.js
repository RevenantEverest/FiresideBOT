const axios = require('axios');

async function getCommands() {
    return axios.get('http://localhost:3005/commands');
};

module.exports = {
    index(req, res, next) {
        getCommands()
        .then(commands => res.json({ message: "Getting Commands", data: commands.data.data }))
        .catch(err => next(err));
    }
};