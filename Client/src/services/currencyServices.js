import axios from 'axios';
import env from '../env';
const services = {};

/* General Currency Settings */

services.getSettings = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/currency/settings/guild_id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.updateSettings = (data) => {
    return axios({
        method: 'PUT',
        url: `${env.API}/currency/settings`,
        data: {
            guild_id: data.guild_id,
            currency_name: data.currency_name,
            currency_increase_rate: data.currency_increase_rate
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    })
};
  
  /* Discord Currency Routes */
  
services.getByGuildId = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/currency/discord/guild_id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.deleteRecord = (data) => {
    return axios({
        method: "DELETE",
        url: `${env.API}/currency/discord/id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;