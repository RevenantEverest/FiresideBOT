import React, { Component } from 'react';
import './AddPlaylist.css';

//Services Imports
import userPlaylistServices from '../../../services/userPlaylistServices';

class AddPlaylist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
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
  }

  handleSubmit(e) {
    e.preventDefault();
    let submitData = {
      user_id: this.props.userData.user_id,
      name: this.state.name
    }
    userPlaylistServices.addPlaylist(submitData)
      .then(results => {
        this.props.getPlaylists();
        document.querySelector("#AddPlaylistForm").reset();
      }).catch(err => console.log(err));
  }

  render() {
    return(
      <div className="AddPlaylist">
        <form id="AddPlaylistForm" onSubmit={this.handleSubmit}>
          <input type="text" name="name" onChange={this.handleChange} />
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
};

export default AddPlaylist;
