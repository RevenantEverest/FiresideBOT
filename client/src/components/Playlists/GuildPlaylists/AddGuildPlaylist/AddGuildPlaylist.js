import React, { Component } from 'react';
import './AddGuildPlaylist.css';

//Services Imports
import guildPlaylistServices from '../../../../services/GuildServices/guildPlaylistServices';

class AddGuildPlaylist extends Component {

  _isMounted = true;

  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let guildName = '';
    for(let i = 0; i < this.props.guildAdmin.length; i++) {
      if(this.state.guildId === this.props.guildAdmin[i].id) guildName = this.props.guildAdmin[i].name;
    }
    let data = {
      guild_id: this.state.guildId,
      guild_name: guildName,
      name: this.state.name
    }
    guildPlaylistServices.addGuildPlaylist(data)
      .then(results => {
        this.props.getUserGuilds();
        document.querySelector('#AddGuildPlaylist-Form').reset();
      })
      .catch(err => console.log(err));
  }

  renderAddPlaylistForm() {
    let Guilds = this.props.guildAdmin.map((el, idx) => {
      return(
        <option value={el.id} key={idx}>{el.name}</option>
      );
    });

    return(
      <form id='AddGuildPlaylist-Form' onSubmit={this.handleSubmit} autoComplete="off">
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
