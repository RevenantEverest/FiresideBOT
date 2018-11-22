import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './C_Promote.css';

//Image Imports
import PromoteImage from '../../../../../res/images/HelpDocsImages/Promote.png';

class C_Promote extends Component {

  _BracketA = '<';
  _BracketB = '>';

  render() {
    return(
      <div id="C_Promote">
        <div className="C_Promote-Contents">
          <Link to="/help/commands/promote"><h3 className="C_Promote-Header">Promote</h3></Link>
          <h4 className="C_Promote-SubHeader"> {this._BracketA}param{this._BracketB}</h4>
          <p className="C_Promote-SubHeader-Param">Promote takes a requires param of an integer value corrisponding to a value available in queue</p>
          <br />
          <br />
          <p className="C_Promote-Desc">Promotes an element in queue to play next.</p>
          <img id="Promote-Image" className="CommandImage" src={PromoteImage} alt="" />
        </div>
      </div>
    );
  }
};

export default C_Promote;
