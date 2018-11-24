import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CustomCommandDocs.css';

class CustomCommandDocs extends Component {

  render() {
    return(
      <div id="CustomCommandDocs">
        <div className="CustomCommandDocs-Contents">
          <Link to="/help/controlpanel/customcommands"><h3 className="CustomCommandDocs-Header">Custom Commands</h3></Link>
          <p className="CustomCommandDocs-SubHeader">Create your own commands for your Twitch or Discord Server chat</p>
          <br />
          <p className="HelpDocs-UnderContruction">Custom Commands are currently under construction and will be released at a later date</p>
        </div>
      </div>
    );
  }
};

export default CustomCommandDocs;
