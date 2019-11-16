import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Skip.css';

class Skip extends Component {

  render() {
    return(
      <div id="Skip">
        <div className="Skip-Contents">
          <Link to="/commands/skip"><h3 className="Skip-Header">Skip</h3></Link>
          <br />
          <br />
          <p className="Skip-Desc">Ends the current song song in queue and plays the next</p>
        </div>
      </div>
    );
  }
};

export default Skip;
