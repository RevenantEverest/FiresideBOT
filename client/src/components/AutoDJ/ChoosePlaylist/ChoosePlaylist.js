import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './ChoosePlaylist.css';

//Services Imports
import userPlaylistServices from '../../../services/UserServices/userPlaylistServices';

class ChoosePlaylist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getPlaylists();
  }

  getPlaylists() {
    userPlaylistServices.getUserPlaylists(this.state.userData.discord_id)
      .then(playlists => {
        if(playlists.data.data.length < 1) this.setState({ playlistData: playlists.data.data, dataReceived: true });
        else this.setState({ playlistData: playlists.data.data, chosenPlaylist: playlists.data.data[0].playlist_id, dataReceived: true });
      })
      .catch(err => console.log(err));
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  chosenPlaylistForm() {
    let Playlists = this.state.playlistData.map((el, idx) => {
      return(
        <option className="ChoosePlaylist-PlaylistOption" key={idx} value={el.playlist_id}>{el.name}</option>
      );
    });

    return(
      <div className="ChoosePlaylist-Playlist">
        <h2 className="ChoosePlaylist-ChoosePlaylist-Header">Choose A Playlist</h2>
        <div className="ChoosePlaylist-PlaylistSelect-Container">
          <select className="ChoosePlaylist-PlaylistSelect" name="chosenPlaylist" onChange={this.handleChange}>
            {Playlists}
          </select>
          <Link className="ChoosePlaylist-PlaylistSubmit" to={{
            pathname: `/autodj`,
            state: {
              userData: this.props.userData,
              playlistId: this.state.chosenPlaylist
            }
          }}>
            Submit
          </Link>
        </div>
      </div>
    );
  }

  handleNoPlaylists() {
    return(
      <div className="ChoosePlaylist-Playlist">
        <h2 className="ChoosePlaylist-ChoosePlaylist-Header">Choose A Playlist</h2>
        <div className="ChoosePlaylist-PlaylistSelect-Container">
          <select className="ChoosePlaylist-PlaylistSelect" name="chosenPlaylist" onChange={this.handleChange}>
            <option className="ChoosePlaylist-PlaylistOption">No Playlists Available</option>
          </select>
          <Link to="/playlists" className="ChoosePlaylist-PlaylistSubmit">Submit</Link>
        </div>
      </div>
    );
  }

  render() {
    return(
      <div id="ChoosePlaylist">
        <div className="ChoosePlaylist-Contents">
          {this.state.dataReceived && this.state.playlistData.length >= 1 ? this.chosenPlaylistForm() : ''}
          {this.state.dataReceived && this.state.playlistData.length < 1 ? this.handleNoPlaylists() : ''}
          {!this.state.userData ? <Redirect to="/" /> : ''}
        </div>
      </div>
    );
  }
};

export default ChoosePlaylist;
