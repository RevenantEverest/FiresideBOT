import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './C_Playlist.css';

//Image Imports
import PlaylistImage from '../../../../../res/images/HelpDocsImages/Playlist.png';
import PlaylistImage_Add from '../../../../../res/images/HelpDocsImages/PlaylistAdd.png';
import PlaylistImage_Add_Flag from '../../../../../res/images/HelpDocsImages/PlaylistAddFlag.png';

class C_Playlist extends Component {

  render() {
    return(
      <div id="C_Playlist">
        <div className="C_Playlist-Contents">
          <Link to="/help/commands/playlist"><h3 className="C_Playlist-Header">Playlist</h3></Link>
          <h4 className="C_Playlist-SubHeader"> [param]</h4>
          <p className="C_Playlist-SubHeader-Param">Playlist takes in an optional parameter of a users playlist name</p>
          <br />
          <br />
          <p className="C_Playlist-Desc">Add an entire playlist to the queue. Playlists can be made on our website.</p>
          <Link id="C_Playlist-LearnMore" to="/help/controlpanel/personalplaylists"> Learn More</Link>
          <br />
          <br />
          <img id="Playlist-ImageA" className="CommandImage" src={PlaylistImage} alt="" />
          <img id="Playlist-ImageB" className="CommandImage" src={PlaylistImage_Add} alt="" />
          <img id="Playlist-ImageC" className="CommandImage" src={PlaylistImage_Add_Flag} alt="" />
          <br />
          <table className="C_Playlist-Table">
            <tbody className="C_Playlist-Tbody">
              <tr className="C_Playlist-TR-Header">
                <th className="C_Playlist-TH-Flag">Flag</th>
                <th className="C_Playlist-TH-Description">Description</th>
              </tr>
              <tr className="C_Playlist-TR">
                <td className="C_Playlist-TD">-s</td>
                <td className="C_Playlist-TD">Shuffles the playlist before adding it to the queue</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default C_Playlist;
