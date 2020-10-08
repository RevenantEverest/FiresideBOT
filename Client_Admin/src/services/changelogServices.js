import axios from 'axios';
import env from '../env';
const services = {};

services.getChangelogs = () => {
    return axios({
        method: "GET",
        url: `${env.API}/changelogs`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.updateChangelog = (data) => {
    return axios({
        method: "PUT",
        url: `${env.API}/changelogs`,
        data: {
            id: data.id,
            content: data.content,
            version: data.version,
            type: data.type
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.deleteChangelog = (data) => {
    return axios({
        method: "DELETE",
        url: `${env.api}/changelogs/id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.getWorkingChangelogs = () => {
    return axios({
        method: "GET",
        url: `${env.API}/admin/working_changelogs`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.createWorkingChangelog = (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/admin/working_changelogs`,
        data: {
            content: data.content,
            version: data.version,
            type: data.type
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.updateWorkingChangelog = (data) => {
    return axios({
        method: "put",
        url: `${env.API}/admin/working_changelogs`,
        data: {
            id: data.id,
            content: data.content,
            version: data.version,
            type: data.type
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.deleteWorkingChangelog = (data) => {
    return axios({
        method: "DELETE",
        url: `${env.API}/admin/working_changelogs/id/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.publish = (data) => {
    return axios({
        method: "POST",
        url: `${env.API}/changelogs`,
        data: {
            content: data.content,
            version: data.version,
            type: data.type,
            send_embed: data.send_embed,
            flavor_text: data.flavor_text
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;