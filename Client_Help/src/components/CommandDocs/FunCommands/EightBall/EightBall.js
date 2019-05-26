import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EightBall.css';

//Component Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';

//Image Imports
import EightBallImage from '../../../../res/images/HelpDocsImages/EightBall.png';

class EightBall extends Component {

  _BracketA = '<';
  _BracketB = '>';

  render() {
    return(
      <div id="EightBall">
        <div className="EightBall-Contents">
          <Link to="/commands/8ball"><h3 className="EightBall-Header">EightBall</h3></Link>
          <h4 className="EightBall-SubHeader">{this._BracketA}param{this._BracketB}</h4>
          <p className="EightBall-SubHeader-Param">Eight Ball take in a required parameter of a yes or no style question</p>
          <br />
          <br />
          <p className="EightBall-Desc">Returns one of multiple potential responses to your asked question.</p>
          <img id="EightBall-ImageA" className="CommandImage" src={EightBallImage} alt="" />
          <br />
          <br />
          <br />
          <AliasTable tableData={[{alias: '8ball'}, {alias: 'fortune'}]} />
        </div>
      </div>
    );
  }
};

export default EightBall;
