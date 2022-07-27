import axios from 'axios';
import env from '../../environment';
const services = {};

services.getGuilds = (token) => {
    return axios({
        method: "GET",
        url: `${env.API}/guilds`,
        headers: { "Authorization": `Bearer ${token}` }
    });
}
  
services.checkForGuild = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/guilds/check/${data}`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};
  
services.getGuildInfo = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/guilds/info/${data}`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};
  
  /* ======== SETTINGS ======== */
  
services.getGuildSettings = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/guilds/settings/guild_id/${data}`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};
  
services.updateSettings = (data, token) => {
    return axios({
        method: 'PUT',
        url: `${env.API}/guilds/settings`,
        data: {
            guild_id: data.guild_id,
            prefix: data.prefix
        },
        headers: { "Authorization": `Bearer ${token}` }
    })
};

export default services;