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
    console.log(this.props.location);
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
    let color = '';
    if(!Array.isArray(this.state.songData)) return;
    let Songs = this.state.songData.map((el, idx) => {
      counter++;
      let minutes = Math.floor(el.duration / 60);;
      let seconds = Math.floor(el.duration - minutes * 60);
      if(counter % 2 === 1) color = "SinglePlaylist-Grey";
      else if(counter % 2 === 0) color = 'SinglePlaylist-White';
      return(
          <div className={`SinglePlaylst-Songs ${color}`}>
            <h3 className="SinglePlaylist-SongTitle">{counter}. {el.title}</h3>
            <p className="SinglePlaylst-SongArtist">Artist: RevenantEverest</p>
            <p className="SinglePlaylist-SongDuration">Duration: {minutes}:{seconds}</p>
            <p className="SinglePlaylist-SongLink"><a href={el.link}>Click Me</a></p>
          </div>
      );
    });

    return(
        <div className="SinglePlaylist-Songs-Container">
          {Songs}
        </div>
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
        <div className="SinglePlaylist-Contents">
          <div className="SinglePlaylist-Header">
            <h1 className="SinglePlaylist-Header-Text">Currency Manager</h1>
            <p className="SinglePlaylist-Header-SubText">
              HOME / {window.location.pathname.split("/")[2] === "personal" ? "personal" : "guild" } /
            </p>
            <p className="SinglePlaylist-Header-SubText-Main"> {this.state.playlistData.name}</p>
          </div>
          {window.location.pathname.split("/")[2] === "guild" ? this.checkForPermissions() : ''}
          {window.location.pathname.split("/")[2] === "personal" ? <AddSong userData={this.state.userData} playlistData={this.state.playlistData} getSongs={this.getSongs} /> : ''}
          <div className="SinglePlaylist-Table-Container">
            {this.state.songDataRecieved ? this.renderSongs() : <div className="loading" id="SinglePlaylist" />}
          </div>
        </div>
      </div>
    );
  }
};

export default SinglePlaylist;
