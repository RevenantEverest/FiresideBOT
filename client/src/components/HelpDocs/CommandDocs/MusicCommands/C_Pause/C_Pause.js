import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './C_Pause.css';

//Image Imports
import PauseImage from '../../../../../res/images/HelpDocsImages/Pause.png';

class C_Pause extends Component {

  render() {
    return(
      <div id="C_Pause">
        <div className="C_Pause-Contents">
          <Link to="/help/commands/pause"><h3 className="C_Pause-Header">Pause</h3></Link>
          <br />
          <br />
          <p className="C_Pause-Desc">Pauses the current song.</p>
          <img id="Pause-Image" className="CommandImage" src={PauseImage} alt="" />
        </div>
      </div>
    );
  }
};

export default C_Pause;
