import axios from 'axios';
import apiConfig from '../../apiConfig';
const services = {};

services.getPlaylists = (data) => {
  return axios.get(`${apiConfig}/playlists`)
};

services.getUserPlaylists = (data) => {
  return axios.get(`${apiConfig}/user/playlists/discord/${data}`);
};

services.addPlaylist = (data) => {
  return axios({
    method: 'POST',
    url: `${apiConfig}/user/playlists`,
    data: {
      user_id: data.user_id,
      name: data.name
    }
  });
};

services.deletePlaylist = (data) => {
  return axios({
    method: 'DELETE',
    url: `${apiConfig}/user/playlists/delete/${data}`
  });
}

export default services;
