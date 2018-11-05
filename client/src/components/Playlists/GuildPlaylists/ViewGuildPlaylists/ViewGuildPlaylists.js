import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ViewGuildPlaylists.css';

//Services Imports
import discordServices from '../../../../services/discordServices';
import guildPlaylistServices from '../../../../services/GuildServices/guildPlaylistServices';

//COmponent Imports
import EditGuildPlaylists from '../EditGuildPlaylists/EditGuildPlaylists';

class ViewGuildPlaylists extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.getUserGuilds = this.getUserGuilds.bind(this);
  }

  componentDidMount() {
    this.getUserGuilds();
  }

  async getUserGuilds() {
    discordServices.getUserGuilds(window.localStorage.access_token)
      .then(guilds => {
        let tempArr = [];
        let guildsPromises = [];
        for(let i = 0; i < guilds.data.length; i++) {
          if(guilds.data[i].permissions >= 2146958591) tempArr.push(guilds.data[i]);
          guildsPromises.push(guildPlaylistServices.getPlaylistByGuildId(guilds.data[i].id));
        }
        this.setState({ guildData: guilds.data, guildPermissionData: tempArr });
        Promise.all(guildsPromises).then(results => {
          let ResultsFilter = results.filter(el => {
            return el.data.data;
          });
          let ResultsMap = ResultsFilter.map((el, idx) => {
            return el.data.data[0];
          })
          this.setState({ playlistData: ResultsMap, dataReceived: true });
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  renderPlaylists() {
    let Guilds = this.state.playlistData.map((el, idx) => {
      return(
        <div key={idx}>
          <h2>{el.guild_name}</h2>
          <Link to={{
            pathname: `/playlists/guild/${el.name}`,
            state: {
              userData: this.props.userData,
              playlistData: el,
              guildPermissionData: this.state.guildPermissionData
            }
          }}>
            {el.name}
          </Link>
        </div>
      );
    });

    return(
      <div>
        {Guilds}
      </div>
    );
  }

  render() {
    return(
      <div id="ViewGuildPlaylists">
        <div className="ViewGuildPlaylists-Contents">
          <h1>Guild Playlists</h1>
          {this.state.dataReceived ? this.renderPlaylists() : ''}
          {this.state.dataReceived ? <EditGuildPlaylists userData={this.props.userData} guilds={this.state.guildData} getUserGuilds={this.getUserGuilds} /> : ''}
        </div>
      </div>
    );
  }
};

export default ViewGuildPlaylists;
