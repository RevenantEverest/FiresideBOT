import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Clear.css';

class Clear extends Component {

  render() {
    return(
      <div id="Clear">
        <div className="Clear-Contents">
          <Link to="/commands/clear"><h3 className="Clear-Header">Clear</h3></Link>
          <br />
          <br />
          <p className="Clear-Desc">Clears the current queue.</p>
        </div>
      </div>
    );
  }
};

export default Clear;
