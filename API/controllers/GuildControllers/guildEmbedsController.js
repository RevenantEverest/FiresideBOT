const Discord = require('discord.js');
const bot = require('../../Discord_Bot');

module.exports = {
    sendEmbed(req, res, next) {

        let embed = new Discord.RichEmbed();
        
        if(req.body.color) embed.setColor(req.body.color);
        if(req.body.title) embed.setTitle(req.body.title);
        if(req.body.description) embed.setDescription(req.body.description);
        if(req.body.author.icon && req.body.author.name) embed.setAuthor(req.body.author.name, req.body.author.icon);
        if(!req.body.author.icon && req.body.author.name) embed.setAuthor(req.body.author.name); 
        if(req.body.thumbnail) embed.setThumbnail(req.body.thumbnail);
        if(req.body.footer.icon && req.body.footer.name) embed.setFooter(req.body.footer.name, req.body.footer.icon);
        if(!req.body.footer.icon && req.body.footer.name) embed.setFooter(req.body.footer.name);

        if(req.body.fields) {
            for(let i = 0; i < req.body.fields.length; i++) {
                embed.addField(req.body.fields[i].text, req.body.fields[i].value, req.body.fields[i].inline);
            }
        }

        try {
            bot.channels.get(req.body.channel_id).send(embed);
            res.status(200).send("Embed Sent");
        }
        catch(err) {
            res.status(500).send("Error Sending Embed");
            console.log(err);
        }
        
    }
};