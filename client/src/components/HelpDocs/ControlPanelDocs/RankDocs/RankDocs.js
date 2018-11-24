import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RankDocs.css';

class RankDocs extends Component {

  render() {
    return(
      <div id="RankDocs">
        <div className="RankDocs-Contents">
          <Link to="/help/controlpanel/ranks"><h3 className="RankDocs-Header">Ranks</h3></Link>
          <p className="RankDocs-SubHeader">Ranks is an in chat level up system for Twitch and Discord allowing users to gain XP based on their activity in chat</p>
          <br />
          <p className="HelpDocs-UnderContruction">Ranks are currently under construction and will be released at a later date</p>
        </div>
      </div>
    );
  }
};

export default RankDocs;
