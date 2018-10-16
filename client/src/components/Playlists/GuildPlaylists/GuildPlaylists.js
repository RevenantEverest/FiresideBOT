import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './GuildPlaylists.css';

//Services Imports
import discordServices from '../../../services/discordServices';
import guildPlaylistServices from '../../../services/GuildServices/guildPlaylistServices';

class GuildPlaylists extends Component {

  _isMounted = false;

  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.getUserGuilds();
  }

  componentWillUnmount() { this._isMounted = false; }

  getUserGuilds() {
    discordServices.getUserGuilds(window.localStorage.access_token)
      .then(guilds => {
        let tempArr = [];
        for(let i = 0; i < guilds.data.length; i++) {
          if(guilds.data[i].permissions >= 2146958591) tempArr.push(guilds.data[i]);
        }
        if(this._isMounted) this.setState({ guilds: tempArr, dataReceived: true });
      })
      .catch(err => console.log(err));
  }

  handleViewGuildPlaylists() { this.setState({ viewGuildPlaylistsRedirect: true }); }
  handleEditGuildPlaylists() { this.setState({ editGuildPlaylistsRedirect: true }); }

  render() {
    return(
      <div id="GuildPlaylists">
        <div className="GuildPlaylists-Contents">
          <div className="ViewGuildPlaylists-Option" onClick={(e) => this.handleViewGuildPlaylists()}>
            <h1 className="ViewGuildPlaylists-Option-Text">View Guild Playlists</h1>
          </div>
          <div className="EditGuildPlaylists-Option" onClick={(e) => this.handleEditGuildPlaylists()}>
            <h1 className="EditGuildPlaylists-Option-Text">Edit Guild Playlists</h1>
          </div>
        </div>
        {this.state.viewGuildPlaylistsRedirect ? <Redirect to="/playlists/view/guild" /> : ''}
        {this.state.editGuildPlaylistsRedirect ? <Redirect to="/playlists/edit/guild" /> :''}
      </div>
    );
  }
};

export default GuildPlaylists;
