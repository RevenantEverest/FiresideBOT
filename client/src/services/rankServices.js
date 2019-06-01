import axios from 'axios';
import env from '../env';
const services = {};

services.getGuildRankRecords = (data) => {
    return axios.get(`${env.API}/ranks/records/guild_id/${data}`);
}

services.getGuildRanks = (data) => {
    return axios.get(`${env.API}/ranks/tiers/guild_id/${data}`);
};

services.getRankSettings = (data) => {
    return axios.get(`${env.API}/ranks/settings/guild_id/${data}`);
};

services.addRank = (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/ranks/tiers`,
        data: {
            guild_id: data.guild_id,
            rank_name: data.rank_name
        }
    });
};

services.updateRank = (data) => {
    return axios({
        method: "PUT",
        url: `${env.API}/ranks/tiers`,
        data: {
            id: data.id,
            guild_id: data.guild_id,
            rank_name: data.rank_name,
            rank_number: data.rank_number
        }
    });
};

services.updateRankSettings = (data) => {
    return axios({
        method: "PUT",
        url: `${env.API}/ranks/settings`,
        data: {
            guild_id: data.guild_id,
            general_increase_rate: data.general_increase_rate,
            channel_id: data.channel.id
        }
    });
};

services.deleteRank = (data) => {
    return axios.delete(`${env.API}/ranks/tiers/id/${data}`);
};

services.deleteRankRecord = (data) => {
    return axios.delete(`${env.API}/ranks/records/id/${data}`);
}

export default services;