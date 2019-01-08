import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UserPlaylists.css';

//Services Imports
import userPlaylistServices from '../../../services/UserServices/userPlaylistServices';
import userSongsServices from '../../../services/UserServices/userSongsServices';

//Component Imports
import AddPlaylist from './AddUserPlaylist/AddUserPlaylist';

class UserPlaylists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
    this.getPlaylists = this.getPlaylists.bind(this);
  }

  componentDidMount() {
    this.getPlaylists();
  }

  getPlaylists() {
    userPlaylistServices.getUserPlaylists(this.props.userData.user_id)
      .then(playlists => {
        if(playlists.data.data.length >= 1) {
          let songPromises = [];
          for(let i = 0; i < playlists.data.data.length; i++) {
            if(!playlists.data.data[i].playlist_id) continue;
            songPromises.push(userSongsServices.getPlaylistSongInfo(playlists.data.data[i].playlist_id));
          }
          Promise.all(songPromises).then(results => {
            let ResultsFilter = results.map(el => {
              return el.data.data;
            });
            let playlistData = [];
            for(let i = 0; i < playlists.data.data.length; i++) {
              let length = 0;
              if(ResultsFilter[i] !== undefined)
                length = ResultsFilter[i].length;
              playlistData.push({playlistInfo: playlists.data.data[i], songs: length})
            }
            this.setState({ playlistData: playlistData, dataRecieved: true });
          })
        }else this.setState({ playlistData: playlists.data.data, dataRecieved: true });
      })
      .catch(err => console.log(err));
  }

  deletePlaylist(el) {
    userPlaylistServices.deletePlaylist(el.playlistInfo.playlist_id)
      .then(this.getPlaylists()).catch(err => console.log(err));
  }

  choosePlaylist(el) {
    this.props.choosePlaylist(el);
    this.setState({ playlistRedirect: true });
  }

  renderPlaylists() {
    let counter = 0;
    let playlistDisplayColor = '';
    if(this.state.playlistData.length < 1) return;
    let Playlists = this.state.playlistData.map((el, idx) => {
      counter++;
      console.log(el.songs)
      if(counter % 2 === 0)
        playlistDisplayColor = 'PD-white';
      else if(counter % 2 === 1)
        playlistDisplayColor = 'PD-grey';
      return(
        <div className={`PlaylistDisplay ${playlistDisplayColor}`} key={idx}>
          <Link className='' to={{
            pathname: `/playlists/personal/${el.playlistInfo.name}`,
            state: {
              userData: this.props.userData,
              playlistData: el.playlistInfo
            }
          }}>
            <h1 className="UserPlaylists-PlaylistName">{el.playlistInfo.name}</h1>
          </Link>
          <p className="UserPlaylists-SongAmount">{el.songs === undefined ? 0 : el.songs} Songs</p>
          <button className="UserPlaylists-Delete" onClick={(e) => this.deletePlaylist(el) }>
            <FontAwesomeIcon className="UserPlaylists-DeleteIcon" icon="trash-alt" />
          </button>
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
      <div id="UserPlaylists">
        <div className="UserPlaylists-Contents">
          <div className="UserPlaylists-Header">
            <h1 className="UserPlaylists-HeaderText">Personal Playlists</h1>
            <Link to="/dashboard"><p className="UserPlaylists-HeaderSubText">HOME / </p></Link>
            <Link to="/playlists"><p className="UserPlaylists-HeaderSubText"> Playlists /</p></Link>
            <p className="UserPlaylists-HeaderSubText-Main"> Personal</p>
          </div>
          {this.state.dataRecieved ? this.renderPlaylists() : <div className="loading" id="LoadingUserPlaylists" />}
          {this.state.playlistRedirect ? <Redirect to="/playlists/single" /> : ''}
        </div>
        <AddPlaylist userData={this.props.userData} getPlaylists={this.getPlaylists} />
      </div>
    );
  }
};

export default UserPlaylists;
