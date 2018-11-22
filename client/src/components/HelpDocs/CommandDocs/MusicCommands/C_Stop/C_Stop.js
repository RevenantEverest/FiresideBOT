import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './C_Stop.css';

//Image Imports
import StopImage from '../../../../../res/images/HelpDocsImages/Stop.png';

class C_Stop extends Component {

  render() {
    return(
      <div id="C_Stop">
        <div className="C_Stop-Contents">
          <Link to="/help/commands/stop"><h3 className="C_Stop-Header">Stop</h3></Link>
          <br />
          <br />
          <p className="C_Stop-Desc">Clears the currenct queue and removes FiresideBOT from your voice channel.</p>
          <img id="Stop-Image" className="CommandImage" src={StopImage} alt="" />
        </div>
      </div>
    );
  }
};

export default C_Stop;
