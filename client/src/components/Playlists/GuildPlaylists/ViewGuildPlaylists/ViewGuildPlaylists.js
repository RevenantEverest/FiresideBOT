import React, { Component } from 'react';
import './ViewGuildPlaylists.css';

//Services Imports
import discordServices from '../../../../services/discordServices';
import guildPlaylistServices from '../../../../services/GuildServices/guildPlaylistServices';

class ViewGuildPlaylists extends Component {

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
          this.setState({ playlistData: results.data, guildData: tempArr, dataReceived: true })
          console.log(results);
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  renderPlaylists() {
    
  }

  render() {
    return(
      <div id="ViewGuildPlaylists">
        <div className="ViewGuildPlaylists">
          {this.state.dataReceived ? this.renderPlaylists() : ''}
        </div>
      </div>
    );
  }
};

export default ViewGuildPlaylists;
