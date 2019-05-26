import axios from 'axios';
import env from '../env';
const services = {};

services.getGuildRankRecords = (data) => {

}

services.getGuildRanks = (data) => {
    return axios.get(`${env.API}/ranks/guild_id/${data}`);
};

services.addRank = (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/ranks`,
        data: {
            guild_id: data.guild_id,
            rank_name: data.rank_name,
            rank_number: data.rank_number
        }
    });
};

services.deleteRank = (data) => {
    return axios.delete(`${env.API}/ranks/id/${data}`);
};

export default services;