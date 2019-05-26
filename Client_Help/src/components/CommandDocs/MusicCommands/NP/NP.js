import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NP.css';

//Component Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';

//Image Imports
import NP_Image from '../../../../res/images/HelpDocsImages/NP.png';

class NP extends Component {

  render() {
    return(
      <div id="NP">
        <div className="NP-Contents">
          <Link to="/commands/np"><h3 className="NP-Header">NP</h3></Link>
          <h4 className="NP-SubHeader"> (Now Playing)</h4>
          <br />
          <br />
          <p className="NP-Desc">Displays the current song.</p>
          <img id="NP-Image" className="CommandImage" src={NP_Image} alt="" />
          <br />
          <br />
          <br />
          <AliasTable tableData={[{alias: 'currentsong'}, {alias: 'nowplaying'}, {alias: 'cs'}]} />
        </div>
      </div>
    );
  }
};

export default NP;
