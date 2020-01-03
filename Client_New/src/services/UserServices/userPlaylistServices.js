import axios from 'axios';
import env from '../../env';
const services = {};
  
services.getUserPlaylists = (data) => {
    return axios.get(`${env.API}/user/playlists/discord/${data}`);
};
  
services.addPlaylist = (data) => {
    return axios({
      method: 'POST',
      url: `${env.API}/user/playlists`,
      data: {
        discord_id: data.discord_id,
        name: data.name,
        public: data.public
      }
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
    }
  })
};
  
services.deletePlaylist = (data) => {
    return axios({
      method: 'DELETE',
      url: `${env.API}/user/playlists/delete/${data}`
    });
};

export default services;