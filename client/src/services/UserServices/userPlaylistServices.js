import axios from 'axios';
import env from '../../env';
const services = {};
  
services.getUserPlaylists = (data) => {
    return axios({
        method: "GET",
        url: `${env.API}/user/playlists/discord/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};
  
services.addPlaylist = (data) => {
    return axios({
        method: 'POST',
        url: `${env.API}/user/playlists`,
        data: {
            discord_id: data.discord_id,
            name: data.name,
            public: data.public
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

services.update = (data) => {
    return axios({
        method: "PUT",
        url: `${env.API}/user/playlist/discord_id/${data.discord_id}`,
        data: {
            discord_id: data.discord_id,
            name: data.name,
            public: data.public
        },
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    })
};
  
services.deletePlaylist = (data) => {
    return axios({
        method: 'DELETE',
        url: `${env.API}/user/playlists/delete/${data}`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};

export default services;