import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './C_Volume.css';

//Image Imports
import VolumeImage from '../../../../../res/images/HelpDocsImages/Volume.png';
import VolumeImage_Set from '../../../../../res/images/HelpDocsImages/VolumeSet.png';

class C_Volume extends Component {

  render() {
    return(
      <div id="C_Volume">
        <div className="C_Volume-Contents">
          <Link to="/help/commands/volume"><h3 className="C_Volume-Header">Volume</h3></Link>
          <h4 className="C_Volume-SubHeader"> [param]</h4>
          <p className="C_Volume-SubHeader-Param">Volume takes in an optional parameter</p>
          <br />
          <br />
          <p className="C_Volume-Desc">Adjusts view current serverwide volume or sets it. Use the optional param of a number between 1 and 100 to set FiresideBOT's output volume.</p>
          <img id="Volume-ImageA" className="CommandImage" src={VolumeImage} alt="" />
          <img id="Volume-ImageB" className="CommandImage" src={VolumeImage_Set} alt="" />
        </div>
      </div>
    );
  }
};

export default C_Volume;
