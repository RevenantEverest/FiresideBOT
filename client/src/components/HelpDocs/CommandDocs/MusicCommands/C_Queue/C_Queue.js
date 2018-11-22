import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './C_Queue.css';

//Image Imports
import QueueImage from '../../../../../res/images/HelpDocsImages/Queue.png';

class C_Queue extends Component {

  render() {
    return(
      <div id="C_Queue">
        <div className="C_Queue-Contents">
          <Link to="/help/commands/queue"><h3 className="C_Queue-Header">Queue</h3></Link>
          <br />
          <br />
          <p className="C_Queue-Desc">Displays the servers current song queue.</p>
          <img id="Queue-Image" className="CommandImage" src={QueueImage} alt="" />
        </div>
      </div>
    );
  }
};

export default C_Queue;
