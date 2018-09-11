import axios from 'axios';
const services = {};

services.getPlaylists = (data) => {
  return axios.get('/playlists')
};

services.getUserPlaylists = (data) => {
  return axios.get(`/playlists/user/${data}`);
};

services.addPlaylist = (data) => {
  return axios({
    method: 'POST',
    url: '/playlists',
    data: {
      user_id: data.user_id,
      name: data.name
    }
  });
};

services.deletePlaylist = (data) => {
  return axios({
    method: 'DELETE',
    url: `/playlists/delete/${data}`
  });
}

export default services;
