import axios from 'axios';
import env from '../env';
const services = {};

services.getChangelogs = async () => {
    return axios.get(`${env.API}/changelogs`);
};

services.publishChangelog = async (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/changelogs`,
        data: {
            content: data.content,
            version: data.version,
            type: data.type,
            flavor_text: data.flavor_text,
            send_embed: data.send_embed
        }
    });
};

services.editChangelog = async (data) => {
    return axios({
        method: "PUT",
        url: `${env.API}/changelogs`,
        data: {
            id: data.id,
            content: data.content,
            version: data.version,
            type: data.type
        }
    });
};

services.deleteChangelog = async (data) => {
    return axios.delete(`${env.API}/changelogs/id/${data}`);
};

services.getWorkingChangelogs = async () => {
    return axios.get(`${env.API}/working_changelogs`)
};

services.createWorkingChangelog = async (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/working_changelogs`,
        data: {
            content: data.content,
            version: data.version,
            type: data.type
        }
    });
};

services.editWorkingChangelog = async (data) => {
    return axios({
        method: "PUT",
        url: `${env.API}/working_changelogs`,
        data: {
            id: data.id,
            content: data.content,
            version: data.version,
            type: data.type
        }
    });
};

services.deleteWorkingChangelog = async (data) => {
    return axios.delete(`${env.API}/working_changelogs/id/${data}`);
};

export default services;