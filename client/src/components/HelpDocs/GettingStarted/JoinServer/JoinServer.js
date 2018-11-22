import React, { Component } from 'react';
import './JoinServer.css';

//Image Imports
import DiscordInvite from '../../../../res/images/HelpDocsImages/DiscordInvite.png';

class JoinServer extends Component {

  render() {
    return(
      <div id="JoinServer">
        <div className="JoinServer-Contents">
          <h3 className="JoinServer-Header">Join Your Server</h3>
          <p className="JoinServer-SubHeader">Click </p>
          <a id="InviteLink" href='https://discordapp.com/oauth2/authorize?client_id=441338104545017878&scope=bot&permissions=2146958591'> Here </a>
          <p className="JoinServer-SubHeader"> to invite FiresideBOT to your desired server.</p>
          <p className="JoinServer-DI-Text">FiresideBOT asks for Administrator permissions to work at its fullest. Please select this option if you want to get the most out of FiresideBOT.</p>
          <img className="JoinServer-DI-Image" src={DiscordInvite} alt="" />
        </div>
      </div>
    );
  }
};

export default JoinServer;
