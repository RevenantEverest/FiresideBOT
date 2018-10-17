import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './GuildPlaylists.css';

//Services Imports
import discordServices from '../../../services/discordServices';
import guildPlaylistServices from '../../../services/GuildServices/guildPlaylistServices';

//Component Imports
import ViewGuildPlaylists from './ViewGuildPlaylists/ViewGuildPlaylists';

class GuildPlaylists extends Component {

  _isMounted = false;

  constructor() {
    super();
    this.state = {

    }
  }

  // handleViewGuildPlaylists() { this.setState({ viewGuildPlaylistsRedirect: true }); }
  // handleEditGuildPlaylists() { this.setState({ editGuildPlaylistsRedirect: true }); }

  render() {
    return(
      <div id="GuildPlaylists">
        <div className="GuildPlaylists-Contents">
          {/* <div className="ViewGuildPlaylists-Option" onClick={(e) => this.handleViewGuildPlaylists()}>
            <h1 className="ViewGuildPlaylists-Option-Text">View Guild Playlists</h1>
          </div>
          <div className="EditGuildPlaylists-Option" onClick={(e) => this.handleEditGuildPlaylists()}>
            <h1 className="EditGuildPlaylists-Option-Text">Edit Guild Playlists</h1>
          </div> */}
          <ViewGuildPlaylists />
        </div>
        {/* {this.state.viewGuildPlaylistsRedirect ? <Redirect to="/playlists/view/guild" /> : ''}
        {this.state.editGuildPlaylistsRedirect ? <Redirect to="/playlists/edit/guild" /> :''} */}
      </div>
    );
  }
};

export default GuildPlaylists;
