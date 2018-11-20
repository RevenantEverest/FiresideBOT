import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GuildPlaylists.css';

//Services Imports
import discordServices from '../../../services/discordServices';
import guildPlaylistServices from '../../../services/GuildServices/guildPlaylistServices';

//COmponent Imports
import AddGuildPlaylist from './AddGuildPlaylist/AddGuildPlaylist';

class GuildPlaylists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dropDownAngle: 'angle-left'
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
          let ResultsFilter = results.filter(el => { return el.data.data; });
          let ResultsMap = ResultsFilter.map((el, idx) => {
            return {guild_name: el.data.data[0].guild_name, playlists: el.data.data};
          });
          this.setState({ playlistData: ResultsMap, dataReceived: true });
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  renderPlaylists() {
    let counter = 0;
    let colorDisplay = '';
    let Guilds = this.state.playlistData.map((el, idx) => {
      counter++;
      if(counter % 2 === 0) colorDisplay = 'VGP-White';
      else if(counter % 2 === 1) colorDisplay = 'VGP-Grey';
      let playlistCounter = 0;
      let playlists = el.playlists.map((PEL, index) => {
        playlistCounter++;
        return(
          <div className="VGP-Playlists">
            <Link className="VGP-Playlists-Link" key={index} to={{
              pathname: `/playlists/guild/${PEL.name}`,
              state: {
                userData: this.props.userData,
                playlistData: PEL,
                guildPermissionData: this.state.guildPermissionData
              }
            }}>
              <h1 className="VGP-PlaylistName">{PEL.name}</h1>
              <p className="VGP-PlaylistSongsCount">12 Songs</p>
            </Link>
          </div>
        );
      })
      return(
        <div className={`VGP-ServerDisplay ${colorDisplay} ${this.state.dropDownAngle}`} key={idx}>
          <h2 className="VGP-GuildName">{el.guild_name}</h2>
          <div className={`VGP-Server-Dropdown VGP-Dropdown-${idx}`}>
            {playlists}
          </div>
        </div>
      );
    });

    return(
      <div className="VGP-PlaylistRender">
        {Guilds}
      </div>
    );
  }

  render() {
    return(
      <div id="ViewGuildPlaylists">
        <div className="ViewGuildPlaylists-Contents">
          <div className="ViewGuildPlaylists-Header">
            <h1 className="ViewGuildPlaylists-Header-Text">Guild Playlists</h1>
            <Link to="/dashboard"><p className="ViewGuildPlaylists-SubHeader">HOME / </p></Link>
            <Link to="/playlists"><p className="ViewGuildPlaylists-SubHeader"> Playlists /</p></Link>
            <p className="ViewGuildPlaylists-SubHeader-Main"> Guild</p>
          </div>
          {this.state.dataReceived ? this.renderPlaylists() : <div className="loading" id="LoadingGuildPlaylists" />}
          {this.state.dataReceived ? <AddGuildPlaylist userData={this.props.userData} guildData={this.state.guildData} guildAdmin={this.state.guildPermissionData} getUserGuilds={this.getUserGuilds} /> : ''}
        </div>
      </div>
    );
  }
};

export default GuildPlaylists;
