import axios from 'axios';
import env from '../env';
const services = {};

services.getGuildRankRecords = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/ranks/records/guild_id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
}

services.getGuildRanks = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/ranks/tiers/guild_id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getRankSettings = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/ranks/settings/guild_id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.addRank = (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/ranks/tiers`,
        data: {
            guild_id: data.guild_id,
            rank_name: data.rank_name
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
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
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.updateRankSettings = (data) => {
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
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.deleteRank = (data) => {
    return axios({
        method: "DELETE",
        url: `${env.API}/ranks/tiers/id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.deleteRankRecord = (data) => {
    return axios({
        method: "DELETE",
        url: `${env.API}/ranks/records/id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
}

export default services;