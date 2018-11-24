import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './C_Balance.css';

//Image Imports
import BalanceImage from '../../../../../res/images/HelpDocsImages/Balance.png';

class C_Balance extends Component {

  render() {
    return(
      <div id="C_Balance">
        <div className="C_Balance">
        <Link to="/help/commands/balance"><h3 className="C_Balance-Header">Balance</h3></Link>
        <p className="C_Balance-SubHeader-Param">Displays your current points aquired for that server</p>
        <br />
        <br />
        <p className="C_Balance-Desc">The currency embed shows the name of the currency, the server its for and your username.</p>
        <img className="CommandImage" src={BalanceImage} alt="" />
        </div>
      </div>
    );
  }
};

export default C_Balance;
