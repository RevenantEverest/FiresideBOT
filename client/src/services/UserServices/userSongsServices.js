import axios from 'axios';
const services = {};

services.songInfo = (data) => {
  return axios.get(`/songs/info/${data}`);
};

services.getPlaylistSongInfo = (data) => {
  return axios.get(`/user/songs/playlist/${data}`);
};

services.addSong = (data) => {
  return axios({
    method: 'POST',
    url: '/user/songs',
    data: {
      playlist_id: data.playlist_id,
      link: data.link
    }
  });
};

services.deleteSong = (data) => {
  return axios({
    method: 'DELETE',
    url: `/user/songs/song_id/${data}`,
    data: {
      song_id: data
    }
  })
}
export default services;
