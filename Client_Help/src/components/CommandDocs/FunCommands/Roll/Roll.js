import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Roll.css';

//Component Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';

//Image Imports
import RollImage from '../../../../res/images/HelpDocsImages/Roll.png';

class Roll extends Component {

  render() {
    return(
      <div id="Roll">
        <div className="Roll-Contents">
          <Link to="/commands/roll"><h3 className="Roll-Header">Roll</h3></Link>
          <h4 className="Roll-SubHeader">[param]</h4>
          <p className="Roll-SubHeader-Param">Number</p>
          <br />
          <br />
          <p className="Roll-Desc">Returns a random number between one and the number given as a param. If no param defaults to 6</p>
          <img id="Roll-ImageA" className="CommandImage" src={RollImage} alt="" />
          <br />
          <br />
          <br />
          <AliasTable tableData={[{alias: 'dice'}]} />
        </div>
      </div>
    );
  }
};

export default Roll;