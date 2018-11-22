import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './C_Clear.css';

class C_Clear extends Component {

  render() {
    return(
      <div id="C_Clear">
        <div className="C_Clear-Contents">
          <Link to="/help/commands/clear"><h3 className="C_Clear-Header">Clear</h3></Link>
          <br />
          <br />
          <p className="C_Clear-Desc">Clears the current queue.</p>
        </div>
      </div>
    );
  }
};

export default C_Clear;
