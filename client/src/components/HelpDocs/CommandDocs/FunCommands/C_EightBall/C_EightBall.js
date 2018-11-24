import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './C_EightBall.css';

//Image Imports
import EightBallImage from '../../../../../res/images/HelpDocsImages/EightBall.png';

class C_EightBall extends Component {

  _BracketA = '<';
  _BracketB = '>';

  render() {
    return(
      <div id="C_EightBall">
        <div className="C_EightBall-Contents">
        <Link to="/help/commands/8ball"><h3 className="C_EightBall-Header">Eight Ball</h3></Link>
        <h4 className="C_EightBall-SubHeader">{this._BracketA}param{this._BracketB}</h4>
        <p className="C_EightBall-SubHeader-Param">Eight Ball take in a required parameter of a yes or no style question</p>
        <br />
        <br />
        <p className="C_EightBall-Desc">Returns one of multiple potential responses to your asked question.</p>
        <img id="EightBall-ImageA" className="CommandImage" src={EightBallImage} alt="" />
        </div>
      </div>
    );
  }
};

export default C_EightBall;
