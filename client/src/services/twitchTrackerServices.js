import axios from 'axios';
import env from '../env';
const services = {};

services.getTrackers = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/trackers/twitch/guild_id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.addTracker = (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/trackers/twitch`,
        data: {
            guild_id: data.guild_id,
            channel_id: data.channel_id,
            role_id: data.role_id,
            streamer: data.streamer,
            flavor_text: data.flavor_text
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    })
};

services.editTracker = (data) => {
    return axios({
        method: "PUT",
        url: `${env.API}/trackers/twitch`,
        data: {
            id: data.id,
            guild_id: data.guild_id,
            twitch_username: data.twitch_username,
            twitch_id: data.twitch_id,
            channel_id: data.channel_id,
            role_id: data.role_id,
            flavor_text: data.flavor_text
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.removeTracker = (data) => {
    return axios({
        method: "DELETE",
        url: `${env.API}/trackers/twitch/id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;