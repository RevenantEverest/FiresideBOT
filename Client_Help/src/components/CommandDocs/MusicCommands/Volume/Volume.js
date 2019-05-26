import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Volume.css';

//Component Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';

//Image Imports
import VolumeImage from '../../../../res/images/HelpDocsImages/Volume.png';
import VolumeImage_Set from '../../../../res/images/HelpDocsImages/VolumeSet.png';

class Volume extends Component {

  render() {
    return(
      <div id="Volume">
        <div className="Volume-Contents">
          <Link to="/commands/volume"><h3 className="Volume-Header">Volume</h3></Link>
          <h4 className="Volume-SubHeader"> [param]</h4>
          <p className="Volume-SubHeader-Param">Volume takes in an optional parameter</p>
          <br />
          <br />
          <p className="Volume-Desc">Adjusts view current serverwide volume or sets it. Use the optional param of a number between 1 and 100 to set FiresideBOT's output volume.</p>
          <img id="Volume-ImageA" className="CommandImage" src={VolumeImage} alt="" />
          <img id="Volume-ImageB" className="CommandImage" src={VolumeImage_Set} alt="" />
          <br />
          <br />
          <br />
          <AliasTable tableData={[{alias: 'vol'}]} />
        </div>
      </div>
    );
  }
};

export default Volume;
