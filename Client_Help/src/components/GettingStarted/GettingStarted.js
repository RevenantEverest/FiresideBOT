import React, { Component } from 'react';
import './GettingStarted.css';

//Component Imports
import JoinServer from './JoinServer/JoinServer';

class GettingStarted extends Component {

  render() {
    return(
      <div id="GettingStarted">
        <div className="GettingStarted-Contents">
          <h1>Getting Started</h1>
          <br />
          <JoinServer />
          <br />
          <br />
        </div>
      </div>
    );
  }
};

export default GettingStarted;
