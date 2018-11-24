import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AutoDJDocs.css';

//Image Imports
import ChoosePlaylistImage from '../../../../res/images/HelpDocsImages/ControlPanel/AutoDJ/AutoDJ_ChoosePlaylist.png';
import MainImage from '../../../../res/images/HelpDocsImages/ControlPanel/AutoDJ/AutoDJ_Main.png';
import ControlsImage from '../../../../res/images/HelpDocsImages/ControlPanel/AutoDJ/AutoDJ_Controls.png';
import RedirectImage from '../../../../res/images/HelpDocsImages/ControlPanel/AutoDJ/AutoDJ_Redirect.png';
import QueueImage from '../../../../res/images/HelpDocsImages/ControlPanel/AutoDJ/AutoDJ_Queue.png';

class AutoDJDocs extends Component {

  render() {
    return(
      <div id="AutoDJDocs">
        <div className="AutoDJDocs-Contents">
          <Link to="/help/controlpanel/autodj"><h3 className="AutoDJDocs-Header">AutoDJ</h3></Link>
          <p className="AutoDJDocs-SubHeader">AutoDJ allows you to listen to your created playlists on loop</p>
          <br />
          <p className="AutoDJDocs-Desc">Choose any of your created playlists</p>
          <img id="AutoDJDocs-ImageA" className="AutoDJDocs-Images" src={ChoosePlaylistImage} alt="" />
          <br />
          <p className="AutoDJDocs-Desc">You will be redirected to the main AutoDJ screen consisting of Player Controls, video display, queue redirect (Twitch Functionality) and a table of your current queue.</p>
          <img id="AutoDJDocs-ImageB" className="AutoDJDocs-Images" src={MainImage} alt="" />
          <br />
          <p className="AutoDJDocs-Desc">In your controls, you can pause, play and skip through your playlist. The time display allows you to seek a specific point in the current song. And finally the adjustable volume slider, to enjoy your queue at any volume.</p>
          <img id="AutoDJDocs-ImageC" className="AutoDJDocs-Images" src={ControlsImage} alt="" />
          <br />
          <p className="AutoDJDocs-Desc">You can redirect your Twitch Queue to a Discord Server your in. Requests will go into that servers Music Queue and play along side any requests made in that server. Giving your friends the ability to listen to your chats requests as well.</p>
          <img id="AutoDJDocs-ImageD" className="AutoDJDocs-Images" src={RedirectImage} alt="" />
          <br />
          <p className="AutoDJDocs-Desc">The queue displays your chosen playlists songs. Any requests made from your Twitch chat will be displayed on top and have the ability to be removed from the queue.</p>
          <img id="AutoDJDocs-ImageE" className="AutoDJDocs-Images" src={QueueImage} alt="" />
        </div>
      </div>
    );
  }
};

export default AutoDJDocs;
