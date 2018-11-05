import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './NavBar.css';

//Image Imports
import Logo from '../../res/images/Logo.png';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      musicAngleIcon: 'angle-left',
      commandAngleIcon: 'angle-left'
    }
  }

  handleMusicAngle() {
    let dropdown = document.querySelector('.NavBar-Dropdown-Music');
    let el = document.querySelector('.NavBar-Music');
    if(this.state.musicAngleIcon === 'angle-left') {
      this.setState({ musicAngleIcon: 'angle-down' });
      dropdown.style.display = "block";
      el.style.backgroundColor = "#262626";
    }
    else if(this.state.musicAngleIcon === 'angle-down') {
      this.setState({ musicAngleIcon: 'angle-left' });
      dropdown.style.display = "none";
      el.style.backgroundColor = "#1a1a1a";
    }
  }

  handleCommandAngle() {
    let dropdown = document.querySelector('.NavBar-Dropdown-Command');
    let el = document.querySelector('.NavBar-Commands');
    if(this.state.commandAngleIcon === 'angle-left') {
      this.setState({ commandAngleIcon: 'angle-down' });
      dropdown.style.display = "block";
      el.style.backgroundColor = "#262626";
    }
    else if(this.state.commandAngleIcon === 'angle-down') {
      this.setState({ commandAngleIcon: 'angle-left' });
      dropdown.style.display = "none";
      el.style.backgroundColor = "#1a1a1a";
    }
  }

  render() {
    return(
      <div className="NavBar">
        <div className="NavBar-Logo-Container">
          <img className="NavBar-Logo-Image" src={Logo} alt="" />
          <Link to="/"><h1 className="NavBar-Logo-Text">FiresideBOT</h1></Link>
        </div>

        {/* Dashboard */}
        <Link to="/dashboard">
          <div className="NavBar-Contents NavBar-Dashboard">
            <FontAwesomeIcon className="NavBar-Contents-Text DashboardIcon" icon="tachometer-alt" />
            <h4 className="NavBar-Contents-Text NavBar-Dashboard-Text">Dashboard</h4>
          </div>
        </Link>

        {/* Commands */}
        <div className="NavBar-Contents NavBar-Commands" onClick={(e) => this.handleCommandAngle()}>
          <FontAwesomeIcon className="NavBar-Contents-Text MagicIcon" icon="magic" />
          <h4 className="NavBar-Contents-Text NavBar-Commands-Text">Commands</h4>
          <FontAwesomeIcon className="NavBar-Contents-Text AngleIcon-Command" icon={this.state.commandAngleIcon} />
          <div className="NavBar-Dropdown NavBar-Dropdown-Command">
            <Link to="/commands/custom" className="NavBar-Dropdown-Content"><p>Custom Commands</p></Link>
            <Link to="/commands/default" className="NavBar-Dropdown-Content"><p>Default Commands</p></Link>
          </div>
        </div>

        {/* Analytics */}
        <Link to="/analytics">
          <div className="NavBar-Contents NavBar-Analytics">
            <FontAwesomeIcon className="NavBar-Contents-Text ChartIcon" icon="chart-line" />
            <h4 className="NavBar-Contents-Text NavBar-Analytics-Text">Analytics</h4>
          </div>
        </Link>

        {/* Regulars */}
        <Link to={{ pathname: "/regulars" }}>
          <div className="NavBar-Contents NavBar-Regulars">
            <FontAwesomeIcon className="NavBar-Contents-Text CrownIcon" icon="crown" />
            <h4 className="NavBar-Contents-Text NavBar-Regulars-Text">Regulars</h4>
          </div>
        </Link>

        {/* Ranks */}
        <Link to={{ pathname: "/ranks" }}>
          <div className="NavBar-Contents NavBar-Ranks">
            <FontAwesomeIcon className="NavBar-Contents-Text AwardIcon" icon="award" />
            <h4 className="NavBar-Contents-Text NavBar-Ranks-Text">Ranks</h4>
          </div>
        </Link>

        {/* Moderation */}
        <Link to={{ pathname: "/moderation" }}>
          <div className="NavBar-Contents NavBar-Moderation">
            <FontAwesomeIcon className="NavBar-Contents-Text BoltIcon" icon="bolt" />
            <h4 className="NavBar-Contents-Text NavBar-Moderation-Text">Moderation</h4>
          </div>
        </Link>

        {/* Music */}
        <div className="NavBar-Contents NavBar-Music" onClick={(e) => this.handleMusicAngle()}>
          <FontAwesomeIcon className="NavBar-Contents-Text MusicIcon" icon="music" />
          <h4 className="NavBar-Contents-Text NavBar-Music-Text">Music</h4>
          <FontAwesomeIcon className="NavBar-Contents-Text AngleIcon-Music" icon={this.state.musicAngleIcon} />
          <div className="NavBar-Dropdown NavBar-Dropdown-Music">
            <Link to="/autodj" className="NavBar-Dropdown-Content"><p>AutoDJ</p></Link>
            <Link to="/playlists" className="NavBar-Dropdown-Content"><p>Playlists</p></Link>
          </div>
        </div>

        {/* Help Docs */}
        <Link to={{ pathname: "/help" }}>
          <div className="NavBar-Contents NavBar-Help">
            <FontAwesomeIcon className="NavBar-Contents-Text InfoIcon" icon="info-circle" />
            <h4 className="NavBar-Contents-Text NavBar-Help-Text">Help</h4>
          </div>
        </Link>

        {/* Support Forum */}
        <Link to={{ pathname: "/support" }}>
          <div className="NavBar-Contents NavBar-Support">
            <FontAwesomeIcon className="NavBar-Contents-Text CommentsIcon" icon="comments" />
            <h4 className="NavBar-Contents-Text NavBar-Support-Text">Support</h4>
          </div>
        </Link>
      </div>
    );
  }
};

export default NavBar;
