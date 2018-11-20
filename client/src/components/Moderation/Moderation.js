import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Moderation.css';

//Image Imports
import NTSH from '../../res/images/NTSH.gif';

class Moderation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
  }

  render() {
    return(
      <div id="Moderation">
        <div className="Moderation-Contents">
          <div className="Moderation-Header">
            <h1 className="Moderation-Header-Text">Moderation</h1>
            <Link to="/dashboard"><p className="Moderation-Header-SubText">HOME / </p></Link>
            <p className="Moderation-Header-SubText-Main"> Moderation</p>
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

export default Moderation;
