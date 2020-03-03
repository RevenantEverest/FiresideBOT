import axios from 'axios';
import env from '../env';
const services = {};

services.sendEmbed = (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/guilds/embed`,
        data: {
            channel_id: data.channel_id,
            color: data.color,
            title: data.title,
            description: data.description,
            author: data.author,
            thumbnail: data.thumbnail,
            footer: data.footer,
            fields: data.fields
        }
    });
}

export default services;