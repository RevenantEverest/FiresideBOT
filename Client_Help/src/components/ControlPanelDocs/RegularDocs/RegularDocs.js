import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RegularDocs.css';

class RegularDocs extends Component {

  render() {
    return(
      <div id="RegularDocs">
        <div className="RegularDocs-Contents">
          <Link to="/controlpanel/regulars"><h3 className="RegularDocs-Header">Regulars</h3></Link>
          <p className="RegularDocs-SubHeader">Regulars allows you to set a specific role for command use in your Twitch chat</p>
          <br />
          <p className="HelpDocs-UnderContruction">Regulars is currently under construction and will be released at a later date</p>
        </div>
      </div>
    );
  }
};

export default RegularDocs;
