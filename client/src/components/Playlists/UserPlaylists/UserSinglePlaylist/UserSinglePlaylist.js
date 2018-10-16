import React, { Component } from 'react';
import './UserSinglePlaylist.css';

//Component Imports
// import AddSong from './AddSong/AddSong';

//Services Imports
import userSongsServices from '../../../../services/UserServices/userSongsServices';
import guildSongsServices from '../../../../services/GuildServices/guildSongsServices';

class UserSinglePlaylist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.location.state.userData,
      playlistData: this.props.location.state.playlistData
    }
    this.getSongs = this.getSongs.bind(this);
  }

  componentDidMount() {
    this.getSongs();
  }

  getSongs() {
    userSongsServices.getPlaylistSongInfo(this.state.playlistData.playlist_id)
      .then(songs => {
        this.setState({ songData: songs.data.data, songDataRecieved: true });
      })
      .catch(err => console.log(err));
  }

  deleteSong(el) {
    userSongsServices.deleteSong(el.song_id)
      .then(results => { this.getSongs(); }).catch(err => console.log(err));
  }

  renderSongs() {
    let counter = 0;
    let Songs = this.state.songData.map((el, idx) => {
      counter++;
      return(
          <tr className="SinglePlaylist-TableRow" key={idx}>
            <td className="SinglePlaylist-TableRow-counter">{counter}</td>
            <td className="SinglePlaylist-TableRow-title">{el.title}</td>
            <td className="SinglePlaylist-TableRow-link"><a href={el.link}>{el.link}</a></td>
            <td className="SinglePlaylist-TableRow-action">
              <button className="SinglePlaylist-ActionButton" onClick={(e) => this.deleteSong(el)}>&times;</button>
            </td>
          </tr>
      );
    });

    return(
        <table className="SinglePlaylist-SongTable">
          <tbody className="SinglePlaylist-Tbody">
            <tr className="SinglePlaylist-TableRow">
              <th className="SinglePlaylist-TableRow-counter">#</th>
              <th className="SinglePlaylist-TableRow-title">TITLE</th>
              <th className="SinglePlaylist-TableRow-link">LINK</th>
              <th className="SinglePlaylist-TableRow-action">ACTION</th>
            </tr>
            {Songs}
          </tbody>
        </table>
    );
  }

  render() {
    return(
      <div id="UserSinglePlaylist">
        <h1>{this.state.playlistData.name}</h1>
        <div className="SinglePlaylist-Table-Container">
          {this.state.songDataRecieved ? this.renderSongs() : <div className="loading" id="SinglePlaylist" />}
        </div>
        {/* <AddSong userData={this.state.userData} playlistData={this.state.playlistData} getSongs={this.getSongs} /> */}
      </div>
    );
  }
};

export default UserSinglePlaylist;
