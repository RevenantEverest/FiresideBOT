import axios from 'axios';
import env from '../env';
const services = {};

services.getCustomCommands = () => {
    return axios({
        method: "GET",
        url: `${env.API}/commands/custom`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getOne = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/commands/custom/id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getByGuildId = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/commands/custom/guild_id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getByDiscordId = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/commands/custom/discord_id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getByDiscordIdAndGuildId = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/commands/custom/discord_id/${data.discord_id}/guild_id/${data.guild_id}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.save = (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/commands/custom`,
        data: {
            guild_id: data.guild_id,
            created_by: data.created_by,
            input: data.input,
            output: data.output
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.update = (data) => {
    return axios({
        method: "PUT",
        url: `${env.API}/ccommands/custom`,
        data: {
            id: data.id,
            guild_id: data.guild_id,
            input: data.input,
            output: data.input
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.delete = (data) => {
    return axios({
        method: "DELETE",
        url: `${env.API}/commands/custom/id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;