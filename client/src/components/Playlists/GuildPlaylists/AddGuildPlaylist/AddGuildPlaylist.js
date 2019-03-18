import React, { Component } from 'react';
import './AddGuildPlaylist.css';

//Services Imports
import guildPlaylistServices from '../../../../services/GuildServices/guildPlaylistServices';

class AddGuildPlaylist extends Component {

  _isMounted = true;

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      nameInput: 'CanSubmit'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
    if(name === "name" && this.state.name)
      if(this.state.name.split("").includes(" ")) {
        this.setState({
          nameInput: 'CannotSubmit'
        })
      }else {
        this.setState({ nameInput: 'CanSubmit-Green' })
      }
  }

  handleSubmit(e) {
    e.preventDefault();
    document.querySelector('#AddGuildPlaylist-Form').reset();
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
        <label className="AddGuildPlaylist-NameInput-Label">Playlist Name: </label>
        <input className={`AddGuildPlaylist-NameInput ${this.state.nameInput}`} type="text" name="name" onChange={this.handleChange} />
        <div className="AddGuildPlaylist-Select-Container">
          <select className="AddGuildPlaylist-GuildSelect" name="guildId" onChange={this.handleChange}>
            <option>Select A Server</option>
            {Guilds}
          </select>
        </div>
        <input className="AddGuildPlaylist-Submit" type="submit" value="Create" />
      </form>
    );
  }

  render() {
    return(
      <div id="AddGuildPlaylist">
        <div className="AddGuildPlaylist-Contents">
          {this.renderAddPlaylistForm()}
          {this.state.nameInput === 'CannotSubmit' ? <div className="AGP-CannotSubmit-Text">Playlist name cannot contain any white space</div> : ''}
        </div>
      </div>
    );
  }
};

export default AddGuildPlaylist;
