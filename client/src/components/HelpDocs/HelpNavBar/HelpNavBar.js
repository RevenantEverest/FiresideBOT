import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        <div className="HelpNavBar-Contents-Container">
          <div className="HelpNavBar-Contents">
            <Link to="/help"><p className="HelpNavBar-Contents-Header-Text">GETTING STARTED</p></Link>
            <Link to="/help/join"><p className="HelpNavBar-Contents-Sub-Text">Join Your Server</p></Link>
            <Link to="/help/flags"><p className="HelpNavBar-Contents-Sub-Text">Introduction To Flags</p></Link>
            <br />
            <Link to="/help/controlpanel"><p className="HelpNavBar-Contents-Header-Text">CONTROL PANEL</p></Link>
            <Link to="/help/controlpanel/analytics"><p className="HelpNavBar-Contents-Sub-Text">Analytics</p></Link>
            <Link to="/help/controlpanel/autodj"><p className="HelpNavBar-Contents-Sub-Text">AutoDJ</p></Link>
            <Link to="/help/controlpanel/currency"><p className="HelpNavBar-Contents-Sub-Text">Currency System</p></Link>
            <Link to="/help/controlpanel/customcommands"><p className="HelpNavBar-Contents-Sub-Text">Custom Commands</p></Link>
            <Link to="/help/controlpanel/dashboard"><p className="HelpNavBar-Contents-Sub-Text">Dashboard</p></Link>
            <Link to="/help/controlpanel/guildplaylists"><p className="HelpNavBar-Contents-Sub-Text">Guild Playlists</p></Link>
            <Link to="/help/controlpanel/moderation"><p className="HelpNavBar-Contents-Sub-Text">Moderation</p></Link>
            <Link to="/help/controlpanel/personalplaylists"><p className="HelpNavBar-Contents-Sub-Text">Personal Playlists</p></Link>
            <Link to="/help/controlpanel/ranks"><p className="HelpNavBar-Contents-Sub-Text">Ranks</p></Link>
            <Link to="/help/controlpanel/regulars"><p className="HelpNavBar-Contents-Sub-Text">Regulars</p></Link>
            <br />
            <Link to="/help/commands"><p className="HelpNavBar-Contents-Header-Text">ALL COMMANDS</p></Link>
            <br />
            <Link to="/help/commands/music"><p className="HelpNavBar-Contents-Header-Text">MUSIC COMMANDS</p></Link>
            <Link to="/help/commands/clear"><p className="HelpNavBar-Contents-Sub-Text">Clear</p></Link>
            <Link to="/help/commands/delsong"><p className="HelpNavBar-Contents-Sub-Text">Delsong</p></Link>
            <Link to="/help/commands/np"><p className="HelpNavBar-Contents-Sub-Text">NP</p></Link>
            <Link to="/help/commands/pause"><p className="HelpNavBar-Contents-Sub-Text">Pause</p></Link>
            <Link to="/help/commands/play"><p className="HelpNavBar-Contents-Sub-Text">Play</p></Link>
            <Link to="/help/commands/playlist"><p className="HelpNavBar-Contents-Sub-Text">Playlist</p></Link>
            <Link to="/help/commands/playnext"><p className="HelpNavBar-Contents-Sub-Text">PlayNext</p></Link>
            <Link to="/help/commands/promote"><p className="HelpNavBar-Contents-Sub-Text">Promote</p></Link>
            <Link to="/help/commands/queue"><p className="HelpNavBar-Contents-Sub-Text">Queue</p></Link>
            <Link to="/help/commands/resume"><p className="HelpNavBar-Contents-Sub-Text">Resume</p></Link>
            <Link to="/help/commands/skip"><p className="HelpNavBar-Contents-Sub-Text">Skip</p></Link>
            <Link to="/help/commands/stop"><p className="HelpNavBar-Contents-Sub-Text">Stop</p></Link>
            <Link to="/help/commands/volume"><p className="HelpNavBar-Contents-Sub-Text">Volume</p></Link>
            <br />
            <Link to="/help/commands/currency"><p className="HelpNavBar-Contents-Header-Text">CURRENCY COMMANDS</p></Link>
            <Link to="/help/commands/balance"><p className="HelpNavBar-Contents-Sub-Text">Balance</p></Link>
            <Link to="/help/commands/give"><p className="HelpNavBar-Contents-Sub-Text">Give</p></Link>
            <br />
            <Link to="/help/commands/fun"><p className="HelpNavBar-Contents-Header-Text">FUN COMMANDS</p></Link>

            <Link to="/help/commands/pokemon"><p className="HelpNavBar-Contents-Sub-Text">Pokemon</p></Link>
            <Link to="/help/commands/8ball"><p className="HelpNavBar-Contents-Sub-Text">8ball</p></Link>
          </div>
        </div>
      </div>
    );
  }
};

export default HelpNavBar;
