import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GuildPlaylistDocs.css';

//Image Imports
import ChoosePlaylistImage from '../../../../res/images/HelpDocsImages/ControlPanel/Playlists/Playlists_ChooseMenu.png';
import DisplayImage from '../../../../res/images/HelpDocsImages/ControlPanel/Playlists/GuildPlaylists_Display.png';

class GuildPlaylistDocs extends Component {

  render() {
    return(
      <div id="GuildPlaylistDocs">
        <div className="GuildPlaylistDocs-Contents">
          <Link to="/help/controlpanel/guildplaylists"><h3 className="GuildPlaylistDocs-Header">GuildPlaylistDocs</h3></Link>
          <p className="GuildPlaylistDocs-SubHeader">Guild Playlists can be requested to your Discord Queue and are server specific</p>
          <br />
          <p className="GuildPlaylistDocs-Desc">The playlist tab will bring you to a menu where you can choose if you want to view your personal playlists or available </p>
          <Link to="/help/controlpanel/guildplaylists">
            <p className="GuildPlaylistDocs-Desc GuildPlaylistDocs-Desc-PersonalPlaylists-Link">Personal Playlists</p>
          </Link>
          <img id="GuildPlaylist-ImageA" className="GuildPlaylistDocs-Images" src={ChoosePlaylistImage} alt="" />
          <br />
          <p className="GuildPlaylistDocs-Desc">
            After choosing Guild Playlists in the prior menu, you will be welcomed
            by a view of all available Guild playlists and how many songs are in them.
            The form at the bottom allows you to create new Playlists but you're limited in possible playlist names
            by not being allowed to have any spaces in the name. You can click on any of the playlist names to view their songs.
            If you administrator rights in a server you can edit that servers playlists.
          </p>
          <img id="GuildPlaylist-ImageB" className="GuildPlaylistDocs-Images" src={DisplayImage} alt="" />
        </div>
      </div>
    );
  }
};

export default GuildPlaylistDocs;
