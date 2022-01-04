const fs = require('fs');
const { createCanvas, loadImage, ImageData } = require('canvas');
const { numbers } = require('../../utils');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {

    loadImage('./assets/templates/memes/DisabledMeme.png')
    .then(template => handleTemplate(template))
    .catch(err => console.error(err));

    async function handleTemplate(template) {
        const canvas = createCanvas(template.width, template.height);
        const context = canvas.getContext('2d');

        context.drawImage(template, 0, 0, template.height, template.width);
        
        args.splice(0, 1);
        const text = args.join(" ");

        context.font = "bold 70pt Menlo";
        context.textAlign = "center";
        context.fillStyle = "#000000";
        context.fillText(text, template.width / 2, numbers.percent(template.height, 12));

        sendImage(canvas);
    };

    async function sendImage(canvas) {
        const fileName = `${message.guild.id}_${message.author.id}_disabled_meme.png`;
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(`./assets/generated/${fileName}`, buffer);

        message.channel.send({
            files: [{
                attachment: `./assets/generated/${fileName}`,
                name: `${fileName}.png`
            }]
        })
        .then(() => handleDeleteImage(fileName));
    };

    async function handleDeleteImage(fileName) {
        fs.unlinkSync(`./assets/generated/${fileName}`, (err) => {
            if(err) throw err;
        });
    };
};

module.exports.config = {
    name: "disabledmeme",
    d_name: "DisabledMeme",
    aliases: ['dismeme'],
    category: "Memes"
};