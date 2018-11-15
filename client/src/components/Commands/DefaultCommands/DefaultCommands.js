import React, { Component } from 'react';
import './DefaultCommands.css';

//Image Imports
import NTSH from '../../../res/images/NTSH.gif';

class DefaultCommands extends Component {

  render() {
    return(
      <div className="DefaultCommands">
        <div className="DefaultCommands-Contents">
          <h1>UNDER CONSTRUCTION: Nothing to see here</h1>
          <img className="NTSH" src={NTSH} alt="" />
        </div>
      </div>
    );
  }
};

export default DefaultCommands;
