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
      user_id: this.props.userData.user_id,
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
          <h1 className="AddUserPlaylist-Header">Add Playlist: </h1>
          <form id="AddUserPlaylistForm" onSubmit={this.handleSubmit} autoComplete="off">
            <input className={`${this.state.nameInput}`} type="text" name="name" onChange={this.handleChange} />
            <input type="submit" value="Create" />
          </form>
          {this.state.nameInput === 'CannotSubmit' ? <div className="AUP-CannotSubmit-Text">Playlist name cannot contain any white space</div> : ''}
        </div>
      </div>
    );
  }
};

export default AddUserPlaylist;
