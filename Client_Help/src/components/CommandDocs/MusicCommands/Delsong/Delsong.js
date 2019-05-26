import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Delsong.css';

//Component Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';

//Image Imports
import DelsongImage from '../../../../res/images/HelpDocsImages/Delsong.png';

class Delsong extends Component {

  _BracketA = '<';
  _BracketB = '>';

  render() {
    return(
      <div id="Delsong">
        <div className="Delsong-Contents">
          <Link to="/commands/delsong"><h3 className="Delsong-Header">Delsong</h3></Link>
          <h4 className="Delsong-SubHeader"> {this._BracketA}param{this._BracketB}</h4>
          <p className="Delsong-SubHeader-Param">Delsong takes in a requires param of an integer value available in queue</p>
          <br />
          <br />
          <p className="Delsong-Desc">Removes a song from queue.</p>
          <img className="CommandImage" src={DelsongImage} alt="" />
          <br />
          <br />
          <br />
          <AliasTable tableData={[{alias: 'ds'}]} />
        </div>
      </div>
    );
  }
};

export default Delsong;
