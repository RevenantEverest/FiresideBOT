import React, { Component } from 'react';
import './Analytics.css';

//Image Imports
import NTSH from '../../res/images/NTSH.gif';

class Analytics extends Component {

  render() {
    return(
      <div id="Analytics">
        <div className="Analytics-Contents">
          <div className="Analytics-Header">
            <h1 className="Analytics-Header-Text">Analytics</h1>
            <p className="Analytics-Header-SubText">HOME / </p>
            <p className="Analytics-Header-SubText-Main">Analytics</p>
          </div>
          <h3>UNDER CONSTRUCTION:</h3>
          <p>Nothing to see here :)</p>
          <img className="NTSH" src={NTSH} alt="" />
        </div>
      </div>
    );
  }
};

export default Analytics;
