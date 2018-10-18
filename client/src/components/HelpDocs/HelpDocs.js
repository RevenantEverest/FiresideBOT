import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './HelpDocs.css';

//Component Imports
import HelpNavBar from './HelpNavBar/HelpNavBar';
import GettingStarted from './GettingStarted/GettingStarted';
import ControlPanelDocs from './ControlPanelDocs/ControlPanelDocs';
import CommandDocs from './CommandDocs/CommandDocs';


class HelpDocs extends Component {

  componentDidMount() {
    document.querySelector('.NavBar').style.display = "none";
  }

  render() {
    return(
      <div id="HelpDocs">
        <HelpNavBar />
        <div className="HelpDocs-Contents">
          <Route exact path="/help" component={GettingStarted} />
          <Route exact path="/help/controlpanel" component={ControlPanelDocs} />
          <Route exact path="/help/commands" component={CommandDocs} />
        </div>
      </div>
    );
  }
};

export default HelpDocs;
