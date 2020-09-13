import axios from 'axios';
import env from '../env';
const services = {};

services.loginAdmin = async (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/login/admin`,
        data: { code: data }
    });
};

services.verify = async (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/verify`,
        headers: {
            "Authorization": `Bearer ${data}`
        }
    });
};

export default services;