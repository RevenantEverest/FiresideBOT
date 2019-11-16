import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AnalyticsDocs.css';

class AnalyticsDocs extends Component {

  render() {
    return(
      <div id="AnalyticsDocs">
        <div className="AnalyticsDocs-Contents">
          <Link to="/controlpanel/analytics"><h3 className="AnalyticsDocs-Header">Analytics</h3></Link>
          <p className="AnalyticsDocs-SubHeader">Analytics provides stats for your Twitch channel or your Discord Server</p>
          <br />
          <p className="HelpDocs-UnderContruction">Analytics are currently under construction and will be released at a later date</p>
        </div>
      </div>
    );
  }
};

export default AnalyticsDocs;
