import React, { Component } from 'react';
import './C_Balance.css';

//Image Imports
import BalanceImage from '../../../../../res/images/HelpDocsImages/Balance.png';

class C_Balance extends Component {

  render() {
    return(
      <div id="C_Balance">
        <div className="C_Balance">
        <h3>Balance</h3>
        <img className="CommandImage" src={BalanceImage} alt="" />
        </div>
      </div>
    );
  }
};

export default C_Balance;
