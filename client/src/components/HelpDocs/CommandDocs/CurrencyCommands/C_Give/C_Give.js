import React, { Component } from 'react';
import './C_Give.css';

//Image Imports
import GiveImage from '../../../../../res/images/HelpDocsImages/Give.png';

class C_Give extends Component {

  render() {
    return(
      <div id="C_Give">
        <div className="C_Give">
        <h3>Give</h3>
        <img className="CommandImage" src={GiveImage} alt="" />
        </div>
      </div>
    );
  }
};

export default C_Give;
