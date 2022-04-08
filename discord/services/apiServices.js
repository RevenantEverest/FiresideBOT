const axios = require('axios');
const services = {};

//Open Weather Map
services.getWeather = (data) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data}&APPID=${process.env.WEATHER_API_KEY}`);
};

//Icanhazdadjoke
services.getDadJoke = () => {
    return axios({
        method: "GET",
        url: "https://icanhazdadjoke.com/",
        headers: {
            "Accept": "application/json"
        }
    })
};

module.exports = services;