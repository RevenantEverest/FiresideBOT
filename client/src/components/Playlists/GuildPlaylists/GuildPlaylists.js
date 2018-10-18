import React, { Component } from 'react';
import './GuildPlaylists.css';

//Component Imports
import ViewGuildPlaylists from './ViewGuildPlaylists/ViewGuildPlaylists';

class GuildPlaylists extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return(
      <div id="GuildPlaylists">
        <div className="GuildPlaylists-Contents">
          <ViewGuildPlaylists />
        </div>
      </div>
    );
  }
};

export default GuildPlaylists;
