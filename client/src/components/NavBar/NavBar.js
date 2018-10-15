import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
  }

  render() {
    return(
      <div className="NavBar">
        <div className="NavBar-Logo-Container">
          <div className="NavBar-Logo-Image" />
          <Link to="/"><h1 className="NavBar-Logo-Text">FiresideBOT</h1></Link>
        </div>

        <div className="NavBar-Contents NavBar-Dashboard">
          <FontAwesomeIcon className="NavBar-Contents-Text DashboardIcon" icon="tachometer-alt" />
          <Link to="/dashboard" className="NavBar-Contents-Text NavBar-Dashboard-Text"><h4>Dashboard</h4></Link>
        </div>

        <div className="NavBar-Contents NavBar-Commands">
          <FontAwesomeIcon className="NavBar-Contents-Text MagicIcon" icon="magic" />
          <h4 className="NavBar-Contents-Text NavBar-Commands-Text">Commands</h4>
          <div className="NavBar-Dropdown">
            <Link to="/commands/custom" className="NavBar-Dropdown-Content"><p>Custom Commands</p></Link>
            <Link to="/commands/default" className="NavBar-Dropdown-Content"><p>Default Commands</p></Link>
          </div>
        </div>

        <div className="NavBar-Contents NavBar-Playlists">
          <FontAwesomeIcon className="NavBar-Contents-Text MusicIcon" icon="music" />
          <h4 className="NavBar-Contents-Text NavBar-Playlists-Text">Music</h4>
          <div className="NavBar-Dropdown">
            <Link to="/autodj" className="NavBar-Dropdown-Content"><p>AutoDJ</p></Link>
            <Link to="/playlists" className="NavBar-Dropdown-Content"><p>Playlists</p></Link>
          </div>
        </div>

      </div>
    );
  }
};

export default NavBar;
