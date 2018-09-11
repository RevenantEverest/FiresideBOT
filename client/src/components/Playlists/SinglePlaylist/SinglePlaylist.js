import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SinglePlaylist.css';

//Component Imports
import AddSong from './AddSong/AddSong';

//Services Imports
import songsServices from '../../../services/songsServices';

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
    console.log(this.props.location.state);
    this.getSongs();
  }

  getSongs() {
    songsServices.getPlaylistSongInfo(this.state.playlistData.playlist_id)
      .then(songs => {
        this.setState({ songData: songs.data.data, songDataRecieved: true });
      })
      .catch(err => console.log(err));
  }

  renderSongs() {
    let counter = 0;
    let Songs = this.state.songData.map((el, idx) => {
      counter++;
      return(
        <div className="SinglePlaylist-SongContent" key={idx}>
          <p>{counter}. {el.title}</p>
          <Link to={el.link}>{el.link}</Link>
        </div>
      );
    });

    return(
      <div className="SinglePlaylist-SongContainer">
        {Songs}
      </div>
    );
  }

  render() {
    return(
      <div className="SinglePlaylist">
        <h1>{this.state.playlistData.name}</h1>
        {this.state.songDataRecieved ? this.renderSongs() : <div className="loading" id="SinglePlaylist" />}
        <AddSong userData={this.state.userData} playlistData={this.state.playlistData} getSongs={this.getSongs} />
      </div>
    );
  }
};

export default SinglePlaylist;
