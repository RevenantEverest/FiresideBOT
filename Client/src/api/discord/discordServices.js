import axios from 'axios';
import env from '../../environment';
const services = {};

services.getDiscordUserSize = (token) => {
    return axios({
        method: "GET",
        url: `${env.API}/discord/bot/users/size`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};
  
services.getUserInfo = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/discord/user/info/${data}`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};
  
services.getUserGuilds = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/discord/user/guilds/${data}`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};
  
services.getGuildChannels = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/discord/guilds/channels/${data}`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};

services.getGuildRoles = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/discord/guilds/roles/${data}`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};

export default services;