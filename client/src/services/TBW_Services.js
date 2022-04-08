import axios from 'axios';
import env from '../env';
const services = {};

services.getBannedWords = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/TBW`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.getBannedWordsByChannel = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/TBW/channel/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.addBannedWords = (data) => {
    return axios({
        method: 'POST',
        url: `${env.API}/TBW`,
        data: {
            channel: data.channel,
            banned_word: data.banned_word
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.removeBannedWords = (data) => {
    return axios({
        method: "DELETE",
        url: `${env.API}/TBW/TBW_id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;