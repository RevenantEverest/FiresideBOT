import React, { Component } from 'react';
import './EditGuildPlaylists.css';

//Component Imports
import AddGuildPlaylist from './AddGuildPlaylist/AddGuildPlaylist';

class EditGuildPlaylists extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.getUserGuilds();
  }

  async getUserGuilds() {
    let tempArr = [];
    for(let i = 0; i < this.props.guilds.length; i++) {
      if(this.props.guilds[i].permissions >= 2146958591) {
        tempArr.push(this.props.guilds[i]);
      }
    }
    this.setState({ guildData: tempArr, dataReceived: true });
  }

  renderPlaylists() {
    let Playlists = this.state.playlistData.map((el, idx) => {
      return(
        <div>
          <h2>{el.guild_name}: </h2>
          <h3>{el.name}</h3>
        </div>
      );
    });

    return(
      <div>
        {Playlists}
      </div>
    );
  }

  render() {
    return(
      <div id="EditGuildPlaylists">
        <div className="EditGuildPlaylists-Contents">
          {/* {this.state.dataReceived ? this.renderPlaylists() : ''} */}
          <h3>Add New Guild Playlist: </h3>
          {this.state.dataReceived ? <AddGuildPlaylist guildData={this.state.guildData} /> : ''}
        </div>
      </div>
    );
  }
};

export default EditGuildPlaylists;
