import React, { Component } from 'react';
import './SinglePlaylist.css';

//Component Imports
import AddSong from './AddSong/AddSong';

//Services Imports
import userSongsServices from '../../../services/UserServices/userSongsServices';
import guildSongsServices from '../../../services/GuildServices/guildSongsServices';

class SinglePlaylist extends Component {

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
    if(window.location.pathname.split("/")[2] === "personal") {
      userSongsServices.getPlaylistSongInfo(this.state.playlistData.playlist_id)
        .then(songs => {
          this.setState({ songData: songs.data.data, songDataRecieved: true });
        })
        .catch(err => console.log(err));
    }
    else if(window.location.pathname.split("/")[2] === "guild") {
      guildSongsServices.getPlaylistSongInfo(this.state.playlistData.playlist_id)
        .then(songs => {
          this.setState({ songData: songs.data.data, songDataRecieved: true });
        })
        .catch(err => console.log(err));
    }
  }

  deleteSong(el) {
    if(window.location.pathname.split("/")[2] === "personal") {
      userSongsServices.deleteSong(el.song_id)
        .then(results => { this.getSongs(); }).catch(err => console.log(err));
    }else if(window.location.pathname.split("/")[2] === "guild") {
      guildSongsServices.deleteSong(el.song_id)
        .then(results => { this.getSongs(); }).catch(err => console.log(err));
    }
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

  checkForPermissions() {
    let permissionData = this.props.location.state.guildPermissionData;
    console.log(this.props.location.state.guildPermissionData);
    for(let i = 0; i < permissionData.length; i++) {
      if(permissionData[i].name === this.state.playlistData.guild_name)
        return <AddSong userData={this.state.userData} playlistData={this.state.playlistData} getSongs={this.getSongs} />;
    }
  }

  render() {
    return(
      <div id="SinglePlaylist">
        {window.location.pathname.split("/")[2] === "personal" ? <h1>{this.state.playlistData.name}</h1> : ''}
        {window.location.pathname.split("/")[2] === "guild" ? <h1>{this.state.playlistData.guild_name}: {this.state.playlistData.name}</h1> : ''}
        <div className="SinglePlaylist-Table-Container">
          {this.state.songDataRecieved ? this.renderSongs() : <div className="loading" id="SinglePlaylist" />}
        </div>
        {window.location.pathname.split("/")[2] === "guild" ? this.checkForPermissions() : ''}
        {window.location.pathname.split("/")[2] === "personal" ? <AddSong userData={this.state.userData} playlistData={this.state.playlistData} getSongs={this.getSongs} /> : ''}
      </div>
    );
  }
};

export default SinglePlaylist;
