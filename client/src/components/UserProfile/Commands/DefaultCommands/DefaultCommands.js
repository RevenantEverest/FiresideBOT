import React, { Component } from 'react';
import './DefaultCommands.css';

//Component Imports
import NavBar from '../../NavBar/NavBar';

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
        <NavBar userData={this.state.userData} />
      </div>
    );
  }
};

export default DefaultCommands;
