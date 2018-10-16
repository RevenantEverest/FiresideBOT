import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './SinglePlaylist.css';

//Component Imports
import AddSong from './AddSong/AddSong';

//Services Imports
import userSongsServices from '../../../services/UserServices/userSongsServices';
import guildSongsServices from '../../../services/GuildServices/guildSongsServices';

class SinglePlaylist extends Component {

  render() {
    return(
      <div className="SinglePlaylist">
        <div className="SinglePlaylist-Content">

        </div>
      </div>
    );
  }
};

export default SinglePlaylist;
