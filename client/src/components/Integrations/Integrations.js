import React, { Component } from 'react';
import './Integrations.css';

import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
} from 'mdbreact';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Integrations extends Component {

    render() {
        return(
            <div id="Integrations">
            <MDBCard>
                <MDBCardBody style={{ background: "#1a1a1a" }}>
                <MDBCardTitle>Integrations</MDBCardTitle>
                <MDBCardText>Expand your experience by connecting with various platforms that utilize Fireside!</MDBCardText>
                <MDBBtn color={"#9146FF"} style={{ background: "#9146FF", fontWight: 800 }} size="md">
                <FontAwesomeIcon icon={["fab", "twitch"]} style={{ marginRight: "10px" }} />
                Connect Twitch Account
                </MDBBtn>
                <MDBBtn color={"#116e32"} style={{ background: "#116e32", fontWight: 800 }} size="md">
                <FontAwesomeIcon icon={["fab", "spotify"]} style={{ marginRight: "10px" }} />
                Connect Spotify Account
                </MDBBtn>
                </MDBCardBody>
            </MDBCard>
            </div>
        );
    }
};

export default Integrations;