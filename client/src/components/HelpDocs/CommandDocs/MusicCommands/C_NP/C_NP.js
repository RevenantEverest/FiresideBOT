import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './C_NP.css';

//Image Imports
import NP_Image from '../../../../../res/images/HelpDocsImages/NP.png';

class C_NP extends Component {

  render() {
    return(
      <div id="C_NP">
        <div className="C_NP-Contents">
          <Link to="/help/commands/np"><h3 className="C_NP-Header">NP</h3></Link>
          <h4 className="C_NP-SubHeader"> (Now Playing)</h4>
          <br />
          <br />
          <p className="C_NP-Desc">Displays the current song.</p>
          <img id="NP-Image" className="CommandImage" src={NP_Image} alt="" />
        </div>
      </div>
    );
  }
};

export default C_NP;
