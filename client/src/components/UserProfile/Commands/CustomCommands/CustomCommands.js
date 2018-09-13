import React, { Component } from 'react';
import './CustomCommands.css';

class CustomCommands extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
  }

  render() {
    return(
      <div className="CustomCommands">
      </div>
    );
  }
};

export default CustomCommands;
