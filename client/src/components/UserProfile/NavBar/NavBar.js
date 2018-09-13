import React, { Component } from 'react';
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
          <Link to="/user/dashboard" className="NavBar-Dashboard-Text"><h4>Dashboard</h4></Link>
        </div>

        <div className="NavBar-Contents NavBar-Commands">
          <h4 className="NavBar-Commands-Text">Commands
            <div className="NavBar-Dropdown">
              <Link to="/user/commands/custom" className="NavBar-Dropdown-Content"><p>Custom Commands</p></Link>
              <Link to="/user/commands/default" className="NavBar-Dropdown-Content"><p>Default Commands</p></Link>
            </div>
          </h4>
        </div>

        <div className="NavBar-Contents NavBar-Playlists">
          <h4 className="NavBar-Playlists-Text">Music
            <div className="NavBar-Dropdown">
              <Link to="/user/autodj" className="NavBar-Dropdown-Content"><p>AutoDJ</p></Link>
              <Link to="/user/playlists" className="NavBar-Dropdown-Content"><p>Playlists</p></Link>
            </div>
          </h4>
        </div>

      </div>
    );
  }
};

export default NavBar;
