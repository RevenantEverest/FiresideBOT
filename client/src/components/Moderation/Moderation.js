import React, { Component } from 'react';
import './Moderation.css';

//Image Imports
import NTSH from '../../res/images/NTSH.gif';

class Moderation extends Component {

  render() {
    return(
      <div id="Moderation">
        <div className="Moderation-Contents">
          <div className="Moderation-Header">
            <h1 className="Moderation-Header-Text">Moderation</h1>
            <p className="Moderation-Header-SubText">HOME / </p>
            <p className="Moderation-Header-SubText-Main"> Moderation</p>
          </div>
          <h3>UNDER CONSTRUCTION:</h3>
          <p>Nothing to see here :)</p>
          <img className="NTSH" src={NTSH} alt="" />
        </div>
      </div>
    );
  }
};

export default Moderation;
