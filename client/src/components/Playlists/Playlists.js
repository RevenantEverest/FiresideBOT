import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Playlists.css';

class Playlists extends Component {

  constructor() {
    super();
    this.state = {
      userPlaylistRedirect: false,
      guildPlaylistRedirect: false
    }
  }

  handleUserPlaylistRedirect() { this.setState({ userPlaylistRedirect: true }); }
  handleGuildPlaylistRedirect () { this.setState({ guildPlaylistRedirect: true }); }

  render() {
    return(
      <div className="Playlists">
        <div className="Playlists-Contents">
          <div className="UserPlaylist-Option" onClick={(e) => this.handleUserPlaylistRedirect()}>
            <h1 className="UserPlaylist-Option-Text">Personal Playlists</h1>
          </div>
          <div className="GuildPlaylist-Option" onClick={(e) => this.handleGuildPlaylistRedirect()}>
            <h1 className="GuildPlaylist-Option-Text">Guild Playlists</h1>
          </div>
        </div>
        {this.state.userPlaylistRedirect ? <Redirect to="/playlists/personal" /> : ''}
        {this.state.guildPlaylistRedirect ? <Redirect to="/playlists/guild" /> : ''}
      </div>
    );
  }
};

export default Playlists;
