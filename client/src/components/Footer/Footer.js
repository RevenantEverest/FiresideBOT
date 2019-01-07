import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {

    render() {
        return(
            <div id="Footer">
                <div className="Footer-Contents Footer-Contents-Container">
                    <p className="Footer-Contents">Made with <span role="img">❤️</span> by RevenantEverest </p>
                    <br />
                    <div className="Footer-Contents Footer-Links-Container">
                    <Link id="Footer-Contact-Link" className="Footer-Contents Footer-Links" to="/contact">Contact</Link>
                    <p className="Footer-Contents"> || </p>
                    <Link id="Footer-SupportForum-Link" className="Footer-Contents Footer-Links" to="/supportforums">Support Forum</Link>
                    <p className="Footer-Contents"> || </p>
                    <Link id="Footer-Help-Link" className="Footer-Contents Footer-Links" to="/help">Help</Link>
                    </div>
                </div>
            </div>
        );
    }
};

export default Footer;