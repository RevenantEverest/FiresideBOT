import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Promote.css';

//Image Imports
import PromoteImage from '../../../../res/images/HelpDocsImages/Promote.png';

class Promote extends Component {

  _BracketA = '<';
  _BracketB = '>';

  render() {
    return(
      <div id="Promote">
        <div className="Promote-Contents">
          <Link to="/commands/promote"><h3 className="Promote-Header">Promote</h3></Link>
          <h4 className="Promote-SubHeader"> {this._BracketA}param{this._BracketB}</h4>
          <p className="Promote-SubHeader-Param">Promote takes a requires param of an integer value corrisponding to a value available in queue</p>
          <br />
          <br />
          <p className="Promote-Desc">Promotes an element in queue to play next.</p>
          <img id="Promote-Image" className="CommandImage" src={PromoteImage} alt="" />
        </div>
      </div>
    );
  }
};

export default Promote;
