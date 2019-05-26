import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ModerationDocs.css';

class ModerationDocs extends Component {

  render() {
    return(
      <div id="ModerationDocs">
        <div className="ModerationDocs-Contents">
          <Link to="/controlpanel/moderation"><h3 className="ModerationDocs-Header">Moderation</h3></Link>
          <p className="ModerationDocs-SubHeader">Moderation give you control of your Twitch chat or Discord server by giving you option of setting up what is and isn't allowed in your chat</p>
          <br />
          <p className="HelpDocs-UnderContruction">Moderation is currently under construction and will be released at a later date</p>
        </div>
      </div>
    );
  }
};

export default ModerationDocs;
