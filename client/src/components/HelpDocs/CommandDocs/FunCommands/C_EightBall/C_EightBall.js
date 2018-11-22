import React, { Component } from 'react';
import './C_EightBall.css';

//Image Imports
import EightBallImage from '../../../../../res/images/HelpDocsImages/EightBall.png';

class C_EightBall extends Component {

  render() {
    return(
      <div id="C_EightBall">
        <div className="C_EightBall-Contents">
        <h4>Eight Ball</h4>
        <img className="CommandImage" src={EightBallImage} alt="" />
        </div>
      </div>
    );
  }
};

export default C_EightBall;
