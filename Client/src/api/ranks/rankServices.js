import axios from 'axios';
import env from '../../environment';
const services = {};

services.getGuildRankRecords = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/ranks/records/guild_id/${data}`,
        headers: { "Authorization": `Bearer ${token}` }
    });
}

services.getGuildRanks = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/ranks/tiers/guild_id/${data}`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};

services.getRankSettings = (data, token) => {
    return axios({
        method: "GET",
        url: `${env.API}/ranks/settings/guild_id/${data}`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};

services.addRank = (data, token) => {
    return axios({
        method: "POST",
        url: `${env.API}/ranks/tiers`,
        data: {
            guild_id: data.guild_id,
            rank_name: data.rank_name
        },
        headers: { "Authorization": `Bearer ${token}` }
    });
};

services.updateRank = (data, token) => {
    return axios({
        method: "PUT",
        url: `${env.API}/ranks/tiers`,
        data: {
            id: data.id,
            guild_id: data.guild_id,
            rank_name: data.rank_name,
            rank_number: data.rank_number
        },
        headers: { "Authorization": `Bearer ${token}` }
    });
};

services.updateRankSettings = (data, token) => {
    return axios({
        method: "PUT",
        url: `${env.API}/ranks/settings`,
        data: {
            id: data.id,
            guild_id: data.guild_id,
            general_increase_rate: data.general_increase_rate,
            complexity: data.complexity,
            channel_id: data.channel_id
        },
        headers: { "Authorization": `Bearer ${token}` }
    });
};

services.deleteRank = (data, token) => {
    return axios({
        method: "DELETE",
        url: `${env.API}/ranks/tiers/id/${data}`,
        headers: { "Authorization": `Bearer ${token}` }
    });
};

services.deleteRankRecord = (data, token) => {
    return axios({
        method: "DELETE",
        url: `${env.API}/ranks/records/id/${data}`,
        headers: { "Authorization": `Bearer ${token}` }
    });
}

export default services;