import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './C_Skip.css';

class C_Skip extends Component {

  render() {
    return(
      <div id="C_Skip">
        <div className="C_Skip-Contents">
          <Link to="/help/commands/skip"><h3 className="C_Skip-Header">Skip</h3></Link>
          <br />
          <br />
          <p className="C_Skip-Desc">Ends the current song song in queue and plays the next</p>
        </div>
      </div>
    );
  }
};

export default C_Skip;
