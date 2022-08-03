import axios from 'axios';
import env from '../../env';
const services = {};

services.getGuilds = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/guilds`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
}
  
services.checkForGuild = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/guilds/check/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.getGuildInfo = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/guilds/info/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
  /* ======== SETTINGS ======== */
  
services.getGuildSettings = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/guilds/settings/guild_id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.updateSettings = (data) => {
    return axios({
        method: 'PUT',
        url: `${env.API}/guilds/settings`,
        data: {
            guild_id: data.guild_id,
            prefix: data.prefix
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    })
};

export default services;