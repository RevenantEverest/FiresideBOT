import React, { Component } from 'react';
import './AddGuildPlaylist.css';

//Services Imports
import discordServices from '../../../../../services/discordServices';
import guildPlaylistServices from '../../../../../services/GuildServices/guildPlaylistServices';

class AddGuildPlaylist extends Component {

  _isMounted = true;

  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   this._isMounted = true;
  //   this.getUserGuilds();
  // }
  //
  // componentWillUnmount() { this._isMounted = false; }
  //
  // getUserGuilds() {
  //   discordServices.getUserGuilds(window.localStorage.access_token)
  //     .then(guilds => {
  //       let tempArr = [];
  //       for(let i = 0; i < guilds.data.length; i++) {
  //         if(guilds.data[i].permissions >= 2146958591) tempArr.push(guilds.data[i]);
  //       }
  //       if(this._isMounted) this.setState({ guilds: tempArr, dataReceived: true });
  //     })
  //     .catch(err => console.log(err));
  // }

  handleViewGuildPlaylists() { this.setState({ viewGuildPlaylistsRedirect: true }); }
  handleEditGuildPlaylists() { this.setState({ editGuildPlaylistsRedirect: true }); }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let guildName = '';
    for(let i = 0; i < this.props.guildData.length; i++) {
      if(this.state.guildId === this.props.guildData[i].id) guildName = this.props.guildData[i].name;
    }
    let data = {
      guild_id: this.state.guildId,
      guild_name: guildName,
      name: this.state.name
    }
    guildPlaylistServices.addGuildPlaylist(data)
      .then()
      .catch(err => console.log(err));
  }

  renderAddPlaylistForm() {
    let Guilds = this.props.guildData.map((el, idx) => {
      return(
        <option value={el.id} key={idx}>{el.name}</option>
      );
    });

    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" onChange={this.handleChange} />
        <select name="guildId" onChange={this.handleChange}>
          <option>Select A Server</option>
          {Guilds}
        </select>
        <input type="submit" value="Submit" />
      </form>
    );
  }

  render() {
    return(
      <div id="AddGuildPlaylist">
        <div className="AddGuildPlaylist-Contents">
          {this.renderAddPlaylistForm()}
        </div>
      </div>
    );
  }
};

export default AddGuildPlaylist;
