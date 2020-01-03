import axios from 'axios';
import env from '../env';
const services = {};

services.getCustomCommands = () => {
    return axios.get(`${env.API}/commands/custom`);
};

services.getOne = (data) => {
    return axios.get(`${env.API}/commands/custom/id/${data}`);
};

services.getByGuildId = (data) => {
    return axios.get(`${env.API}/commands/custom/guild_id/${data}`);
};

services.getByDiscordId = (data) => {
    return axios.get(`${env.API}/commands/custom/discord_id/${data}`);
};

services.getByDiscordIdAndGuildId = (data) => {
    return axios.get(`${env.API}/commands/custom/discord_id/${data.discord_id}/guild_id/${data.guild_id}`);
};

services.save = (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/commands/custom`,
        data: {
            guild_id: data.guild_id,
            created_by: data.discord_id,
            input: data.input,
            output: data.output
        }
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
        }
    });
};

services.delete = (data) => {
    return axios.delete(`${env.API}/commands/custom/id/${data}`);
};

export default services;