import React, { Component } from 'react';
import './EditGuildPlaylists.css';

//Services Imports
import discordServices from '../../../../services/discordServices';
import guildPlaylistServices from '../../../../services/GuildServices/guildPlaylistServices';

//Component Imports
import AddGuildPlaylist from './AddGuildPlaylist/AddGuildPlaylist';

class EditGuildPlaylists extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {
    this.getUserGuilds();
  }

  async getUserGuilds() {
    discordServices.getUserGuilds(window.localStorage.access_token)
      .then(guilds => {
        let tempArr = [];
        let playlistData = [];
        let guildsPromises = [];
        for(let i = 0; i < guilds.data.length; i++) {
          if(guilds.data[i].permissions >= 2146958591) {
            tempArr.push(guilds.data[i]);
            guildsPromises.push(guildPlaylistServices.getPlaylistByGuildId(guilds.data[i].id));
          }
        }
        Promise.all(guildsPromises).then(results => {
          let ResultsMap = results.map((el, idx) => {
            return el.data.data[0];
          })
          console.log(ResultsMap);
          this.setState({ playlistData: ResultsMap, guildData: tempArr, dataReceived: true });
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
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
          {this.state.dataReceived ? this.renderPlaylists() : ''}
          {this.state.dataReceived ? <AddGuildPlaylist guildData={this.state.guildData} /> : ''}
        </div>
      </div>
    );
  }
};

export default EditGuildPlaylists;
