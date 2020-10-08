import axios from 'axios';
import env from '../env';
const services = {};

services.getCommandLogs = () => {
    return axios({
        method: "GET",
        url: `${env.TEST_API}/admin/commands/logs`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};



export default services;