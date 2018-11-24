import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './DashboardDocs.css';

//Image Imports
import MainImage from '../../../../res/images/HelpDocsImages/ControlPanel/Dashboard/DashboardMain.png';
import SettingsImage from '../../../../res/images/HelpDocsImages/ControlPanel/Dashboard/DashboardSettings.png';

class DashboardDocs extends Component {

  render() {
    return(
      <div id="DashboardDocs">
        <div className="DashboardDocs-Contents">
          <Link to="/help/controlpanel/dashboard"><h3 className="DashboardDocs-Header">Dashboard</h3></Link>
          <p className="DashboardDocs-SubHeader">The Dashboard is the place for all relevant information to be displayed to you</p>
          <br />
          <br />
          <p className="DashboardDocs-Desc">Choose a server to manage.</p>
          <img id="Dashboard-ImageA" className="DashboardDocs-Images" src={MainImage} alt="" />
          <br />
          <p className="DashboardDocs-Desc">Adjust all settings relevant to that server.</p>
          <img id="Dashboard-ImageB" className="DashboardDocs-Images" src={SettingsImage} alt="" />
        </div>
      </div>
    );
  }
};

export default DashboardDocs;
