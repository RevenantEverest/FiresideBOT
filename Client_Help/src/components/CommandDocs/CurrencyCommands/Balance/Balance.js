import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Balance.css';

//Component Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';

//Image Imports
import BalanceImage from '../../../../res/images/HelpDocsImages/Balance.png';


class Balance extends Component {

  render() {
    return(
      <div id="Balance">
        <div className="Balance">
        <Link to="/commands/balance"><h3 className="Balance-Header">Balance</h3></Link>
        <p className="Balance-SubHeader-Param">Displays your current points aquired for that server</p>
        <br />
        <br />
        <p className="Balance-Desc">The currency embed shows the name of the currency, the server its for and your username.</p>
        <img className="CommandImage" src={BalanceImage} alt="" />
        <br />
        <br />
        <br />

        <AliasTable tableData={[{alias: 'bal'}]}/>
        </div>
      </div>
    );
  }
};

export default Balance;
