const Discord = require('discord.js');
const apiServices = require('../../services/apiServices');

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send('Please specify a City name');

    apiServices.getWeather(args[1])
        .then(results => {
            let embed = new Discord.RichEmbed();
            embed
                .setTitle('**Weather**')
                .setColor(0x7289DA)
                .setThumbnail(`https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Ficon-park.com%2Fimagefiles%2Fsimple_weather_icons_partly_mixed_rain_and_thunderstorms.png&f=1`)
                .addBlankField()
                .addField('Current Temp:', `${Math.round((results.data.main.temp - 273.15) * 9/5 + 32)}°F || ${Math.round(results.data.main.temp -273.15)}°C`)
                .addField('Temp High:', `${Math.round((results.data.main.temp_max - 273.15) * 9/5 + 32)}°F || ${Math.round(results.data.main.temp_max -273.15)}°C`, true)
                .addField('Temp Low', `${Math.round((results.data.main.temp_min - 273.15) * 9/5 + 32)}°F || ${Math.round(results.data.main.temp_min -273.15)}°C`, true)
                .addField('Humidity:', `${results.data.main.humidity}%`, true)
                .addField('Visibility:', `${Math.round(results.data.visibility * 0.000621371192)} mi || ${Math.round(results.data.visibility / 1000)} km`, true)
                .setFooter(`Powered by OpenWeatherMap`, 'https://i.imgur.com/PeEMGZA.png')

            message.channel.send(embed)
        })
        .catch(err => {
            if(err.response.status === 404) message.channel.send('City Not Found')
            else errorHandler(message, err, "Weather API Error", "Weather")
        });
};

module.exports.config = {
    name: "weather",
    d_name: "Weather",
    aliases: ["w"],
    params: { required: true, params: "City Name" },
    category: 'Info',
    desc: "Displays the current weather for the spcified City",
    example: 'weather New York'
};