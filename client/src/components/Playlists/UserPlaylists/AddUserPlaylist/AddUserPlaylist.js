import React, { Component } from 'react';
import './AddUserPlaylist.css';

//Services Imports
import userPlaylistServices from '../../../../services/UserServices/userPlaylistServices';

class AddUserPlaylist extends Component {

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
    this.setState({
      [name]: value
    });
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
    if(this.state.name.split("").includes(" ")) return document.querySelector('#AddUserPlaylistForm').reset();
    let submitData = {
      discord_id: this.props.userData.discord_id,
      name: this.state.name
    }
    userPlaylistServices.addPlaylist(submitData)
      .then(results => {
        this.props.getPlaylists();
        document.querySelector("#AddUserPlaylistForm").reset();
      }).catch(err => console.log(err));
  }

  render() {
    return(
      <div id="AddUserPlaylist">
        <div className="AddUserPlaylist-Contents">
          <form id="AddUserPlaylistForm" onSubmit={this.handleSubmit} autoComplete="off">
            <label className="AddUserPlaylist-NameInput-Label">Playlist Name:</label>
            <input className={`AddUserPlaylist-NameInput ${this.state.nameInput}`} type="text" name="name" onChange={this.handleChange} />
            <input className="AddUserPlaylist-Submit" type="submit" value="Create" />
          </form>
          {this.state.nameInput === 'CannotSubmit' ? <div className="AUP-CannotSubmit-Text">Playlist name cannot contain any white space</div> : ''}
        </div>
      </div>
    );
  }
};

export default AddUserPlaylist;
