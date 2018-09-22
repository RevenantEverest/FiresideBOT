import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Playlists.css';

//Services Imports
import playlistServices from '../../../services/playlistServices';

//Component Imports
import AddPlaylist from './AddPlaylist/AddPlaylist';

class Playlists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
    this.getPlaylists = this.getPlaylists.bind(this);
  }

  componentDidMount() {
    this.getPlaylists();
    console.log(this.state.userData);
  }

  getPlaylists() {
    playlistServices.getUserPlaylists(this.props.userData.user_id)
      .then(playlists => {
        if(playlists.data.data.length >= 1) {
          this.setState({ playlistData: playlists.data.data, dataRecieved: true });
        }
      })
      .catch(err => console.log(err));
  }

  deletePlaylist(el) {
    playlistServices.deletePlaylist(el.playlist_id)
      .then(this.getPlaylists()).catch(err => console.log(err));
  }

  choosePlaylist(el) {
    this.props.choosePlaylist(el);
    this.setState({ playlistRedirect: true });
  }

  renderPlaylists() {
    let Playlists = this.state.playlistData.map((el, idx) => {
      return(
        <div className="PlaylistDisplay" key={idx}>
          <Link to={{
            pathname: `/user/playlists/${el.name}`,
            state: {
              userData: this.props.userData,
              playlistData: el
            }
          }}>
            {el.name}
          </Link>
          <button onClick={(e) => this.deletePlaylist(el) }>Delete</button>
        </div>
      );
    });

    return(
      <div className="PlaylistsContainer">
        {Playlists}
      </div>
    );
  }

  render() {
    return(
      <div className="Playlists">
        <div className="Playlists-Contents">
          {this.state.dataRecieved ? this.renderPlaylists() : <div className="loading" id="Playlists" />}
          <AddPlaylist userData={this.props.userData} getPlaylists={this.getPlaylists} />
          {this.state.playlistRedirect ? <Redirect to="/playlists/single" /> : ''}
        </div>
      </div>
    );
  }
};

export default Playlists;
