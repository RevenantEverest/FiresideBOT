import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HelpNavBar.css';

//Image Imports
import Logo from '../../../res/images/Logo.png';

class HelpNavBar extends Component {

  render() {
    return(
      <div id="HelpNavBar">
        <Link to="/dashboard">
        <div className="HelpNavBar-Logo-Container">
          <img className="HelpNavBar-Logo" src={Logo} alt="" />
          <h1 className="HelpNavBar-Logo-Text">FiresideBOT</h1>
          <p className="HelpNavBar-Logo-SubText">Help Docs</p>
        </div>
        </Link>
        <div className="HelpNavBar-Contents">
          <Link to="/help"><p className="HelpNavBar-Contents-Header-Text">GETTING STARTED</p></Link>
          <p className="HelpNavBar-Contents-Sub-Text">Have FiresideBOT Join Your Server</p>
          <br />
          <Link to="/help/controlpanel"><p className="HelpNavBar-Contents-Header-Text">CONTROL PANEL</p></Link>
          <p className="HelpNavBar-Contents-Sub-Text">Dashboard</p>
          <p className="HelpNavBar-Contents-Sub-Text">Default Commands</p>
          <p className="HelpNavBar-Contents-Sub-Text">Custom Commands</p>
          <p className="HelpNavBar-Contents-Sub-Text">Analytics</p>
          <p className="HelpNavBar-Contents-Sub-Text">Regulars</p>
          <p className="HelpNavBar-Contents-Sub-Text">Ranks</p>
          <p className="HelpNavBar-Contents-Sub-Text">Moderation</p>
          <p className="HelpNavBar-Contents-Sub-Text">Personal Playlists</p>
          <p className="HelpNavBar-Contents-Sub-Text">Guild Playlists</p>
          <p className="HelpNavBar-Contents-Sub-Text">AutoDJ</p>
          <br />
          <Link to="/help/commands"><p className="HelpNavBar-Contents-Header-Text">COMMANDS</p></Link>
          <p className="HelpNavBar-Contents-Sub-Text">Music</p>
          <p className="HelpNavBar-Contents-Sub-Text">Polls</p>
        </div>
      </div>
    );
  }
};

export default HelpNavBar;
