import React, { Component } from 'react';
import './AutoDJ.css';

class AutoDJ extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <div className="AutoDJ">
        <div className="AutoDJ-Contents">
        </div>
      </div>
    );
  }
};

export default AutoDJ;
