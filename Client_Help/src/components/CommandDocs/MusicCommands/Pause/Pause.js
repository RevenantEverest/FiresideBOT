import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Pause.css';

//Image Imports
import PauseImage from '../../../../res/images/HelpDocsImages/Pause.png';

class Pause extends Component {

  render() {
    return(
      <div id="Pause">
        <div className="Pause-Contents">
          <Link to="/commands/pause"><h3 className="Pause-Header">Pause</h3></Link>
          <br />
          <br />
          <p className="Pause-Desc">Pauses the current song.</p>
          <img id="Pause-Image" className="CommandImage" src={PauseImage} alt="" />
        </div>
      </div>
    );
  }
};

export default Pause;
