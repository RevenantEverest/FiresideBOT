import axios from 'axios';
import env from '../env';
const services = {};

services.getDiscordUserSize = () => {
    return axios({
        method: "GET",
        url: `${env.API}/discord/bot/users/size`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.getUserInfo = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/discord/user/info/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.getUserGuilds = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/discord/user/guilds/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.getGuildChannels = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/discord/guilds/channels/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getGuildRoles = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/discord/guilds/roles/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;