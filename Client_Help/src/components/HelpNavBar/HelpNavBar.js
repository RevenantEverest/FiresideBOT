import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HelpNavBar.css';

//Image Imports
import Logo from '../../res/images/Logo.png';

class HelpNavBar extends Component {

  render() {
    return(
      <div id="HelpNavBar">
        <a href="https://firesidebot.com">
        <div className="HelpNavBar-Logo-Container">
          <img className="HelpNavBar-Logo" src={Logo} alt="" />
          <h1 className="HelpNavBar-Logo-Text">FiresideBOT</h1>
          <p className="HelpNavBar-Logo-SubText">Help Docs</p>
        </div>
        </a>
        <div className="HelpNavBar-Contents-Container">
          <div className="HelpNavBar-Contents">
            <Link to="/whatsnew"><p className="HelpNavBar-Contents-Header-Text">WHAT'S NEW</p></Link>
            <br />
            <Link to="/"><p className="HelpNavBar-Contents-Header-Text">GETTING STARTED</p></Link>
            <Link to="/join"><p className="HelpNavBar-Contents-Sub-Text">Join Your Server</p></Link>
            <br />
            <Link to="/controlpanel"><p className="HelpNavBar-Contents-Header-Text">CONTROL PANEL</p></Link>
            <Link to="/controlpanel/analytics"><p className="HelpNavBar-Contents-Sub-Text">Analytics</p></Link>
            <Link to="/controlpanel/autodj"><p className="HelpNavBar-Contents-Sub-Text">AutoDJ</p></Link>
            <Link to="/controlpanel/currency"><p className="HelpNavBar-Contents-Sub-Text">Currency System</p></Link>
            <Link to="/controlpanel/customcommands"><p className="HelpNavBar-Contents-Sub-Text">Custom Commands</p></Link>
            <Link to="/controlpanel/dashboard"><p className="HelpNavBar-Contents-Sub-Text">Dashboard</p></Link>
            <Link to="/controlpanel/guildplaylists"><p className="HelpNavBar-Contents-Sub-Text">Guild Playlists</p></Link>
            <Link to="/controlpanel/moderation"><p className="HelpNavBar-Contents-Sub-Text">Moderation</p></Link>
            <Link to="/controlpanel/personalplaylists"><p className="HelpNavBar-Contents-Sub-Text">Personal Playlists</p></Link>
            <Link to="/controlpanel/ranks"><p className="HelpNavBar-Contents-Sub-Text">Ranks</p></Link>
            <Link to="/controlpanel/regulars"><p className="HelpNavBar-Contents-Sub-Text">Regulars</p></Link>
            <br />
            <Link to="/commands"><p className="HelpNavBar-Contents-Header-Text">ALL COMMANDS</p></Link>
            <Link to="/commands/aliases"><p className="HelpNavBar-Contents-Sub-Text">Aliases</p></Link>
            <Link to="/commands/flags"><p className="HelpNavBar-Contents-Sub-Text">Flags</p></Link>
            <br />

            {/* Music Commands */}
            <Link to="/commands/music"><p className="HelpNavBar-Contents-Header-Text">MUSIC COMMANDS</p></Link>
            <Link to="/commands/addsong"><p className="HelpNavBar-Contents-Sub-Text">AddSong</p></Link>
            <Link to="/commands/autoplay"><p className="HelpNavBar-Contents-Sub-Text">Autoplay</p></Link>
            <Link to="/commands/clear"><p className="HelpNavBar-Contents-Sub-Text">Clear</p></Link>
            <Link to="/commands/createplaylist"><p className="HelpNavBar-Contents-Sub-Text">CreatePlaylist</p></Link>
            <Link to="/commands/deleteplaylist"><p className="HelpNavBar-Contents-Sub-Text">DeletePlaylist</p></Link>
            <Link to="/commands/delsong"><p className="HelpNavBar-Contents-Sub-Text">Delsong</p></Link>
            <Link to="/commands/loop"><p className="HelpNavBar-Contents-Sub-Text">Loop</p></Link>
            <Link to="/commands/lyrics"><p className="HelpNavBar-Contents-Sub-Text">Lyrics</p></Link>
            <Link to="/commands/musicoptions"><p className="HelpNavBar-Contents-Sub-Text">MusicOptions</p></Link>
            <Link to="/commands/np"><p className="HelpNavBar-Contents-Sub-Text">NP</p></Link>
            <Link to="/commands/pause"><p className="HelpNavBar-Contents-Sub-Text">Pause</p></Link>
            <Link to="/commands/play"><p className="HelpNavBar-Contents-Sub-Text">Play</p></Link>
            <Link to="/commands/playlist"><p className="HelpNavBar-Contents-Sub-Text">Playlist</p></Link>
            <Link to="/commands/playnext"><p className="HelpNavBar-Contents-Sub-Text">PlayNext</p></Link>
            <Link to="/commands/promote"><p className="HelpNavBar-Contents-Sub-Text">Promote</p></Link>
            <Link to="/commands/queue"><p className="HelpNavBar-Contents-Sub-Text">Queue</p></Link>
            <Link to="/commands/removesong"><p className="HelpNavBar-Contents-Sub-Text">RemoveSong</p></Link>
            <Link to="/commands/resume"><p className="HelpNavBar-Contents-Sub-Text">Resume</p></Link>
            <Link to="/commands/skip"><p className="HelpNavBar-Contents-Sub-Text">Skip</p></Link>
            <Link to="/commands/songinfo"><p className="HelpNavBar-Contents-Sub-Text">SongInfo</p></Link>
            <Link to="/commands/stop"><p className="HelpNavBar-Contents-Sub-Text">Stop</p></Link>
            <Link to="/commands/volume"><p className="HelpNavBar-Contents-Sub-Text">Volume</p></Link>
            <br />

            {/* Currency Commands */}
            <Link to="/commands/currency"><p className="HelpNavBar-Contents-Header-Text">CURRENCY COMMANDS</p></Link>
            <Link to="/commands/balance"><p className="HelpNavBar-Contents-Sub-Text">Balance</p></Link>
            <Link to="/commands/give"><p className="HelpNavBar-Contents-Sub-Text">Give</p></Link>
            <br />

            {/* Fun Commands */}
            <Link to="/commands/fun"><p className="HelpNavBar-Contents-Header-Text">FUN COMMANDS</p></Link>
            <Link to="/commands/pokemon"><p className="HelpNavBar-Contents-Sub-Text">Pokemon</p></Link>
            <Link to="/commands/roll"><p className="HelpNavBar-Contents-Sub-Text">Roll</p></Link>
            <Link to="/commands/8ball"><p className="HelpNavBar-Contents-Sub-Text">8ball</p></Link>
            <br />

            {/* Info Commands */}
            <Link to="/commands/info"><p className="HelpNavBar-Contents-Header-Text">INFO COMMANDS</p></Link>
            <Link to="/commands/botinfo"><p className="HelpNavBar-Contents-Sub-Text">BotInfo</p></Link>
            <Link to="/commands/serverinfo"><p className="HelpNavBar-Contents-Sub-Text">ServerInfo</p></Link>
            <Link to="/commands/userinfo"><p className="HelpNavBar-Contents-Sub-Text">UserInfo</p></Link>
            <Link to="/commands/weather"><p className="HelpNavBar-Contents-Sub-Text">Weather</p></Link>
          </div>
        </div>
      </div>
    );
  }
};

export default HelpNavBar;
