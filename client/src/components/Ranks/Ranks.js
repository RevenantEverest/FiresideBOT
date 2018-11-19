import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Ranks.css';

//Image Imports
import NTSH from '../../res/images/NTSH.gif';

class Ranks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
  }

  render() {
    return(
      <div id="Ranks">
        <div className="Ranks-Contents">
          <div className="Ranks-Header">
            <h1 className="Ranks-Header-Text">Ranks</h1>
            <p className="Ranks-Header-SubText">HOME / </p>
            <p className="Ranks-Header-SubText-Main"> Ranks</p>
          </div>
          <h3>UNDER CONSTRUCTION:</h3>
          <p>Nothing to see here :)</p>
          <img className="NTSH" src={NTSH} alt="" />
        </div>
        {!this.state.userData ? <Redirect to="/" /> : ''}
      </div>
    );
  }
};

export default Ranks;
