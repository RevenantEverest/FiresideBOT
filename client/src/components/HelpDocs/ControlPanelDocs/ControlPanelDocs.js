import React, { Component } from 'react';
import './ControlPanelDocs.css';

//Component Imports
import AnalyticsDocs from './AnalyticsDocs/AnalyticsDocs';
import AutoDJDocs from './AutoDJDocs/AutoDJDocs';
import CurrencyDocs from './CurrencyDocs/CurrencyDocs';
import CustomCommandDocs from './CustomCommandDocs/CustomCommandDocs';
import DashboardDocs from './DashboardDocs/DashboardDocs';
import GuildPlaylistDocs from './GuildPlaylistDocs/GuildPlaylistDocs';
import ModerationDocs from './ModerationDocs/ModerationDocs';
import PersonalPlaylistDocs from './PersonalPlaylistDocs/PersonalPlaylistDocs';
import RankDocs from './RankDocs/RankDocs';
import RegularDocs from './RegularDocs/RegularDocs';

class ControlPanelDocs extends Component {

  componentDidMount() {
    document.querySelector('.NavBar').style.display = "none";
  }

  render() {
    return(
      <div id="ControlPanelDocs">
        <div className="ControlPanelDocs-Contents">
          <h1 className="ControlPanelDocs-Header">Control Panel</h1>
          <p className="ControlPanelDocs-SubHeader"></p>
          <AnalyticsDocs />
          <AutoDJDocs />
          <CurrencyDocs />
          <CustomCommandDocs />
          <DashboardDocs />
          <GuildPlaylistDocs />
          <ModerationDocs />
          <PersonalPlaylistDocs />
          <RankDocs />
          <RegularDocs />
        </div>
      </div>
    );
  }
};

export default ControlPanelDocs;
