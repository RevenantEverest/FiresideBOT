import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CurrencyDocs.css';

//Image Imports
import MainImage from '../../../res/images/HelpDocsImages/ControlPanel/Currency/Currency_Main.png';
import SettingsImage from '../../../res/images/HelpDocsImages/ControlPanel/Currency/CurrencySettings.png';

class CurrencyDocs extends Component {

  render() {
    return(
      <div id="CurrencyDocs">
        <div className="CurrencyDocs-Contents">
          <Link to="/controlpanel/currency"><h3 className="CurrencyDocs-Header">Currency System</h3></Link>
          <p className="CurrencyDocs-SubHeader">Award your viewers and / or Discord server members for their chat activity with points</p>
          <br />
          <br />
          <p className="CurrencyDocs-Desc">Choose your desired Server to manage settings for.</p>
          <img id="Currency-ImageA" className="CurrencyDocs-Images" src={MainImage} alt="" />
          <br />
          <p className="CurrencyDocs-Desc">Adjust your currencies setting to your liking. The currency increase rate is based on a per message basis for Discord and per minute viewing time for Twitch.</p>
          <img id="Currency-ImageB" className="CurrencyDocs-Images" src={SettingsImage} alt="" />
        </div>
      </div>
    );
  }
}

export default CurrencyDocs;
