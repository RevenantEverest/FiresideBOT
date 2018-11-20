import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SupportForum.css';

//Image Imports
import NTSH from '../../res/images/NTSH.gif';

class SupportForum extends Component {

  render() {
    return(
      <div id="SupportForum">
        <div className="SupportForum-Contents">
          <div className="SupportForum-Header">
            <h1 className="SupportForum-Header-Text">Support Forum</h1>
            <Link to="/dashboard"><p className="SupportForum-Header-SubText">HOME / </p></Link>
            <p className="SupportForum-Header-SubText-Main"> SupportForum</p>
          </div>
          <h3>Support Forum is under construction but you can get support from our <a className="SF-DiscordLink" href="https://discord.gg/pES5dxZ">Discord</a></h3>
          <br />
          <h3>UNDER CONSTRUCTION:</h3>
          <p>Nothing to see here :)</p>
          <img className="NTSH" src={NTSH} alt="" />
        </div>
      </div>
    );
  }
};

export default SupportForum;
