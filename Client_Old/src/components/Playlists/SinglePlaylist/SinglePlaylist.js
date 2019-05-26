import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      playlistData: this.props.location.state.playlistData,
      DurationExceeded: false,
      NoDuplicates: false,
    }
    this.getSongs = this.getSongs.bind(this);
  }

  componentDidMount() {
    if(window.location.pathname.split("/")[2] === "personal")
      this.setState({ linkTo: 'personal' });
    else if(window.location.pathname.split("/")[2] === "guild")
      this.setState({ linkTo: 'guild'});
    this.getSongs();
  }

  getSongs() {
    if(window.location.pathname.split("/")[2] === "personal") {
      userSongsServices.getPlaylistSongInfo(this.state.playlistData.playlist_id)
        .then(songs => {
          for(let i = 0; i < songs.data.data.length; i++) {
            if(songs.data.data[i].duration >= 600) {
              this.deleteSong(songs.data.data[i]);
              this.setState({ DurationExceeded: true });
            }
          }
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
          <div className={`SinglePlaylst-Songs ${color}`} key={idx}>
            <h3 className="SinglePlaylist-SongTitle">{counter}. {el.title}</h3>
            <p className="SinglePlaylst-SongArtist">Artist: {el.author}</p>
            <p className="SinglePlaylist-SongDuration">Duration: {minutes}:{seconds}</p>
            <p className="SinglePlaylist-SongLink"><a href={el.link}>Click Me</a></p>
            <button className="SinglePlaylist-Delete" onClick={(e) => this.deleteSong(el)}>
              <FontAwesomeIcon className="SinglePlaylist-DeleteIcon" icon="trash-alt" />
            </button>
          </div>
      );
    });

    return(
        <div className="SinglePlaylist-Songs-Container">
          {Songs}
        </div>
    );
  }

  renderDurationExceeded() {
    setTimeout(() => {
      this.setState({ DurationExceeded: false });
    }, 5000);
    return(
      <div className="DurationExceeded">
        <div className="DE-Header">
          <FontAwesomeIcon className="DE-Icon" icon="exclamation-circle" />
          <h1 className="DE-Header-Text">Duration Exceeded!</h1>
        </div>
        <div className="DE-Contents">
          <p className="DE-Contents-Text">Your request cannot exceed 10 minutes</p>
        </div>
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
            <h1 className="SinglePlaylist-Header-Text">{this.state.playlistData.name}</h1>
            <Link to="/dashboard"><p className="SinglePlaylist-Header-SubText">HOME / </p></Link>
            <Link to="/playlists"><p className="SinglePlaylist-Header-SubText"> Playlists / </p></Link>
            <Link to={`/playlists/${this.state.linkTo}`}>
              <p className="SinglePlaylist-Header-SubText">{window.location.pathname.split("/")[2] === "personal" ? "Personal" : "Guild" } /</p>
            </Link>
            <p className="SinglePlaylist-Header-SubText-Main"> {this.state.playlistData.name}</p>
          </div>
          {window.location.pathname.split("/")[2] === "guild" ? this.checkForPermissions() : ''}
          {window.location.pathname.split("/")[2] === "personal" ? <AddSong userData={this.state.userData} playlistData={this.state.playlistData} getSongs={this.getSongs} /> : ''}
          <div className="SinglePlaylist-Songs-Container">
            {this.state.songDataRecieved ? this.renderSongs() : <div className="loading" id="SinglePlaylist" />}
          </div>
          {this.state.DurationExceeded ? this.renderDurationExceeded() : ''}
          {this.state.NoDuplicates ? this.renderNoDuplicated() : ''}
        </div>
      </div>
    );
  }
};

export default SinglePlaylist;
