import React, { Component } from 'react';
import './AddSong.css';

//Services Imports
import userSongsServices from '../../../../services/UserServices/userSongsServices';
import guildSongsServices from '../../../../services/GuildServices/guildSongsServices';

class AddSong extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log(this.props.playlistData.playlist_id);
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
    document.querySelector("#AddSongForm").reset();
    let songData = {
      playlist_id: this.props.playlistData.playlist_id,
      link: this.state.link
    }
    if(window.location.pathname.split("/")[2] === "personal") {
      userSongsServices.addSong(songData)
        .then(results => {
          this.props.getSongs(this.props.playlistData);
        })
        .catch(err =>  console.log(err));
    }else if(window.location.pathname.split("/")[2] === "guild") {
      guildSongsServices.addSong(songData)
        .then(results => {
          this.props.getSongs(this.props.playlistData);
        })
        .catch(err =>  console.log(err));
    }
  }

  render() {
    return(
      <div id="AddSong">
        <form id="AddSongForm" onSubmit={this.handleSubmit} autoComplete="off">
          <label className="AddSong-NameInput-Label">Add Song: </label>
          <br />
          <input className="AddSong-NameInput" type="text" name="link" onChange={this.handleChange} />
          <input className="AddSong-Submit" type="submit" value="Add" />
          <br />
          <label className="AddSong-NameInput-Desc">Use a YouTube search or link to add a song.</label>
        </form>
      </div>
    );
  }
};

export default AddSong;
