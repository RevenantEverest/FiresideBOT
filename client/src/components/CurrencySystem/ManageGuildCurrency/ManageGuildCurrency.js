import React, { Component } from 'react';
import './ManageGuildCurrency.css';

//Component Imports
import CurrencySettings from './CurrencySettings/CurrencySettings';

class ManageGuildCurrency extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
  }

  render() {
    return(
      <div id="ManageGuildCurrency">
        <div className="ManageGuildCurrency-Contents">
          <div className="ManageGuildCurrency-Header">
            <h1 className="ManageGuildCurrency-Header-Text">Manage Currency</h1>
            <p className="ManageGuildCurrency-Header-SubText">HOME / currency /</p>
            <p className="ManageGuildCurrency-Header-SubText-Main"> Manage</p>
          </div>
          <CurrencySettings userData={this.state.userData} />
        </div>
      </div>
    );
  }
};

export default ManageGuildCurrency;
