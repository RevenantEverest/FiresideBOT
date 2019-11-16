import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Stop.css';

//Image Imports
import StopImage from '../../../../res/images/HelpDocsImages/Stop.png';

class Stop extends Component {

  render() {
    return(
      <div id="Stop">
        <div className="Stop-Contents">
          <Link to="/commands/stop"><h3 className="Stop-Header">Stop</h3></Link>
          <br />
          <br />
          <p className="Stop-Desc">Clears the currenct queue and removes FiresideBOT from your voice channel.</p>
          <img id="Stop-Image" className="CommandImage" src={StopImage} alt="" />
        </div>
      </div>
    );
  }
};

export default Stop;
