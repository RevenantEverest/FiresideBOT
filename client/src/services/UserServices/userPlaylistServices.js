import axios from 'axios';
const services = {};

services.getPlaylists = (data) => {
  return axios.get('/playlists')
};

services.getUserPlaylists = (data) => {
  return axios.get(`/user/playlists/user/${data}`);
};

services.addPlaylist = (data) => {
  return axios({
    method: 'POST',
    url: '/user/playlists',
    data: {
      user_id: data.user_id,
      name: data.name
    }
  });
};

services.deletePlaylist = (data) => {
  return axios({
    method: 'DELETE',
    url: `/user/playlists/delete/${data}`
  });
}

export default services;
