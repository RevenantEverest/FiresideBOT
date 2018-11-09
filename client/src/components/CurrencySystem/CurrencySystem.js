import React, { Component } from 'react';
import './CurrencySystem.css';

//Services Imports

class CurrencySystem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
  }

  render() {
    return(
      <div id="CurrencySystem">
        <div className="CurrencySystem-Contents">
          <h1>Currency System</h1>
        </div>
      </div>
    );
  }
};

export default CurrencySystem;
