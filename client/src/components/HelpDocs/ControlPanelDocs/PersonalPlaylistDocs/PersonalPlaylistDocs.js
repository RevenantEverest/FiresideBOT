import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PersonalPlaylistDocs.css';

//Image Imports
import ChoosePlaylistImage from '../../../../res/images/HelpDocsImages/ControlPanel/Playlists/Playlists_ChooseMenu.png';
import DisplayImage from '../../../../res/images/HelpDocsImages/ControlPanel/Playlists/PersonalPlaylist_Display.png';
import SinglePlaylistImage from '../../../../res/images/HelpDocsImages/ControlPanel/Playlists/PersonalPlaylist_Single.png';

class PersonalPlaylistDocs extends Component {

  render() {
    return(
      <div id="PersonalPlaylistDocs">
        <div className="PersonalPlaylistDocs-Contents">
          <Link to="/help/controlpanel/personalplaylist"><h3 className="PersonalPlaylistDocs-Header">Personal Playlists</h3></Link>
          <p className="PersonalPlaylistDocs-SubHeader">Create your own playlists to be used in the </p>
          <Link to="/help/controlpanel/autodj">
            <p className="PersonalPlaylistDocs-SubHeader PersonalPlaylistDocs-SubHeader-AutoDJLink">AutoDJ</p>
          </Link>
          <p className="PersonalPlaylistDocs-SubHeader"> panel and can be requested to your Discord music queue</p>
          <br />
          <p className="PersonalPlaylistDocs-Desc">The playlist tab will bring you to a menu where you can choose if you want to view your personal playlists or available </p>
          <Link to="/help/controlpanel/guildplaylists">
            <p className="PersonalPlaylistDocs-Desc PersonalPlaylistDocs-Desc-GuildPlaylists-Link"> Guild Playlists</p>
          </Link>
          <img id="PersonalPlaylist-ImageA" className="PersonalPlaylistDocs-Images" src={ChoosePlaylistImage} alt="" />
          <br />
          <p className="PersonalPlaylistDocs-Desc">After choosing Personal Playlist in the prior menu, you will be welcomed by a view of all your available playlists and how many songs are in them. The form at the bottom allows you to create new Playlists but you're limited in possible playlist names by not being allowed to have any spaces in the name. You can click on any of your playlist names to view their songs.</p>
          <img id="PersonalPlaylist-ImageB" className="PersonalPlaylistDocs-Images" src={DisplayImage} alt="" />
          <br />
          <p className="PersonalPlaylistDocs-Desc">The Single Playlist view shows you all songs in your playlist along with other related info such as Artist, and length. The form ontop allows you to add song to your playlist with either a YouTube link or a YouTube search request.</p>
          <img id="PersonalPlaylist-ImageC" className="PersonalPlaylistDocs-Images" src={SinglePlaylistImage} alt="" />
        </div>
      </div>
    );
  }
};

export default PersonalPlaylistDocs;
