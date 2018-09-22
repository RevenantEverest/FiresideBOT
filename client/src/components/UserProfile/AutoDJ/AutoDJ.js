import React, { Component } from 'react';
import './AutoDJ.css';

//Services Imports
import playlistServices from '../../../services/playlistServices';
import songsServices from '../../../services/songsServices';

//Component Imports
import YouTube from 'react-youtube';

class AutoDJ extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      queue: null,
      playPauseClass: 'AutoDJ-PlayPause-Play'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNextSong = this.handleNextSong.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handlePlayerStateChange = this.handlePlayerStateChange.bind(this);
    this._onReady = this._onReady.bind(this);
  }

  componentDidMount() {
    this.getPlaylists();
  }

  getPlaylists() {
    playlistServices.getUserPlaylists(this.state.userData.user_id)
      .then(playlists => {
        this.setState({ playlistData: playlists.data.data, chosenPlaylist: playlists.data.data[0].playlist_id, dataReceived: true });
      })
      .catch(err => console.log(err));
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    songsServices.getPlaylistSongInfo(this.state.chosenPlaylist)
      .then(songs => { this.setState({ queue: songs.data.data }) })
      .catch(err => console.log(err));
  }

  chosenPlaylistForm() {
    let Playlists = this.state.playlistData.map((el, idx) => {
      return(
        <option key={idx} value={el.playlist_id}>{el.name}</option>
      );
    });

    return(
      <form onSubmit={this.handleSubmit}>
        <select name="chosenPlaylist" onChange={this.handleChange}>
          {Playlists}
        </select>
        <input type="submit" value="Select" />
      </form>
    );
  }

  renderSongs() {
    let counter = -1;
    let Songs = this.state.queue.map((el, idx) => {
      return(
        <tr key={idx}>
          <td>{el.title}</td>
          <td>{el.link}</td>
        </tr>
      );
    });

    Songs.splice(0, 1);

    return(
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Link</th>
          </tr>
          {Songs}
        </tbody>
      </table>
    );
  }

  _onReady(event) {
  }

  handleNextSong(event) {
    let queue = this.state.queue;
    queue.push(queue[0]);
    queue.shift();
    this.setState({ queue: queue }, () => this.renderIframe());
  }

  handleVolumeChange() {

  }

  handlePlayerStateChange(event) {
    // if(this.state.playPauseClass === 'AutoDJ-PlayPause-Play') {
    //   this.setState({ playPauseClass: 'AutoDJ-PlayPause-Pause'});
    //   console.log(this.state.pauseVideo);
    // }
    // else if(this.state.playPauseClass === 'AutoDJ-PlayPause-Pause') {
    //   this.setState({ playPauseClass: 'AutoDJ-PlayPause-Play'});
    //   this.state.playVideo();
    // }
  }

  renderIframe() {
    console.log("Hello");
    let opts = {
      playerVars: {
        autoplay: 1,
        disabledb: 1,
        rel: 0,
        enablejsapi: 1
      }
    }

    let minutes = Math.floor(this.state.queue[0].duration / 60);
    let seconds = Math.floor(this.state.queue[0].duration - minutes * 60);
    if(seconds.toString().split("").length === 1) seconds = "0" + seconds;

    return(
      <div className="placeholder">
        <div className="NextButton" onClick={this.handleNextSong} />
        <div className={`${this.state.playPauseClass}`} onClick={this.handlePlayerStateChange}/>
        <h1> Current Song </h1>
        <div className="videoWrapper">
          <YouTube
            id="ytp"
            videoId={this.state.queue[0].link.split("?v=")[1]}
            opts={opts}
            onReady={this._onReady}
            onEnd={this.handleNextSong}
            onStateChange={this.handlePlayerStateChange}
          />
          <input type="range" max="100" value="14" onChange={this.handleVolumeChange}/>
        </div>
        <h4>{this.state.queue[0].title}</h4>
        <p>Duration: {minutes}:{seconds}</p>
        <div className="AutoDJ-Link-Icon"/>
        <p className="Auto-DJ-CurrentSong-Link"><a href={this.state.queue[0].link}>Click Here</a></p>
      </div>
    );
  }

  test(e) {
    console.log(e.target);
  }

  render() {
    return(
      <div className="AutoDJ">
        <div className="AutoDJ-Contents">
          {!this.state.queue && this.state.dataReceived ? this.chosenPlaylistForm() : ''}
          <div className="videoWrapper-Container">
            {this.state.queue ? this.renderIframe() : ''}
          </div>
          {this.state.queue ? this.renderSongs() : ''}
        </div>
      </div>
    );
  }
};

export default AutoDJ;
