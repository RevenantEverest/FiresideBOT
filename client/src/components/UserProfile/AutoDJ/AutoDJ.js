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
      queue: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNextSong = this.handleNextSong.bind(this);
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
      .then(songs => {
        let tempArr = [];
        for(let i = 0; i < songs.data.data.length; i++) {
          tempArr.push(songs.data.data[i].link.split("?v=")[1]);
        }
        this.setState({
          chosenPlaylistData: songs.data.data,
          queue: tempArr
        });
      })
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
    let counter = 0;
    let Songs = this.state.chosenPlaylistData.map((el, idx) => {
      counter++;
      return(
        <tr key={idx}>
          <td>{counter}</td>
          <td>{el.title}</td>
          <td>{el.link}</td>
        </tr>
      );
    });

    return(
      <table>
        <tbody>
          <tr>
            <th>#</th>
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
    this.setState({ queue: queue }, () => this.renderIframe())
  }

  renderIframe() {
    let opts = {
      playerVars: {
        autoplay: 1,
        disabledb: 1,
        rel: 0,
        enablejsapi: 1
      }
    }

    return(
      <div className="videoWrapper">
        <div className="NextButton" onClick={this.handleNextSong} />
        <YouTube
          videoId={this.state.queue[0]}
          opts={opts}
          onReady={this._onReady}
          onEnd={this.handleNextSong}
        />
      </div>
    );
  }

  render() {
    return(
      <div className="AutoDJ">
        <div className="AutoDJ-Contents">
          {!this.state.chosenPlaylistData && this.state.dataReceived ? this.chosenPlaylistForm() : ''}
          <div className="videoWrapper-Container">
            {this.state.chosenPlaylistData ? this.renderIframe() : ''}
          </div>
          {this.state.chosenPlaylistData ? this.renderSongs() : ''}
        </div>
      </div>
    );
  }
};

export default AutoDJ;
