import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Playlist.css';

//Component Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';

//Component Imports
import FlagsTable from '../../Flags/FalgsTable/FlagsTable';

//Image Imports
import PlaylistImage from '../../../../res/images/HelpDocsImages/Playlist.png';
import PlaylistImage_Add from '../../../../res/images/HelpDocsImages/PlaylistAdd.png';
import PlaylistImage_Add_Flag from '../../../../res/images/HelpDocsImages/PlaylistAddFlag.png';


class Playlist extends Component {

  render() {
    return(
      <div id="Playlist">
        <div className="Playlist-Contents">
          <Link to="/commands/playlist"><h3 className="Playlist-Header">Playlist</h3></Link>
          <h4 className="Playlist-SubHeader"> [param]</h4>
          <p className="Playlist-SubHeader-Param">Playlist takes in an optional parameter of a users playlist name</p>
          <br />
          <br />
          <p className="Playlist-Desc">Add an entire playlist to the queue. Playlists can be made on our website.</p>
          <Link id="Playlist-LearnMore" to="/help/controlpanel/personalplaylists"> Learn More</Link>
          <br />
          <br />
          <img id="Playlist-ImageA" className="CommandImage" src={PlaylistImage} alt="" />
          <img id="Playlist-ImageB" className="CommandImage" src={PlaylistImage_Add} alt="" />
          <img id="Playlist-ImageC" className="CommandImage" src={PlaylistImage_Add_Flag} alt="" />
          <br />
          <FlagsTable 
            tableData={
              [
                {flag: '-s', desc: 'Shuffles the playlist before adding it to the queue'},
                {flag: '-i', desc: 'Displays relevant playlist info'}
              ]
            } 
          />
          <AliasTable tableData={[{alias: 'playlists'}]} />
        </div>
      </div>
    );
  }
};

export default Playlist;
