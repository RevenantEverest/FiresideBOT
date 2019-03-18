import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './DefaultCommands.css';

//Image Imports
import NTSH from '../../../res/images/NTSH.gif';

class DefaultCommands extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
  }

  render() {
    return(
      <div className="DefaultCommands">
        <div className="DefaultCommands-Contents">
          <h1>UNDER CONSTRUCTION: Nothing to see here</h1>
          <img className="NTSH" src={NTSH} alt="" />
        </div>
        {!this.state.userData ? <Redirect to="/" /> : ''}
      </div>
    );
  }
};

export default DefaultCommands;
