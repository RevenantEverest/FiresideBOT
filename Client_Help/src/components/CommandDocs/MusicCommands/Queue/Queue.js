import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Queue.css';

//Component Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';

//Image Imports
import QueueImage from '../../../../res/images/HelpDocsImages/Queue.png';

class Queue extends Component {

  render() {
    return(
      <div id="Queue">
        <div className="Queue-Contents">
          <Link to="/commands/queue"><h3 className="Queue-Header">Queue</h3></Link>
          <br />
          <br />
          <p className="Queue-Desc">Displays the servers current song queue.</p>
          <img id="Queue-Image" className="CommandImage" src={QueueImage} alt="" />
          <br />
          <br />
          <br />
          <AliasTable tableData={[{alias: 'q'}]} />
        </div>
      </div>
    );
  }
};

export default Queue;
