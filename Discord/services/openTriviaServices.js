const axios = require('axios');
const services = {};

services.basicTrivia = async (data) => {
    let category = data.category ? `&category=${data.category}` : '';
    let difficulty = data.difficulty ? `&difficulty=${data.difficulty}` : '';
    let amount = `amount=${data.amount}`;
    return axios.get(`https://opentdb.com/api.php?${amount}${category}${difficulty}`)
};

module.exports = services;