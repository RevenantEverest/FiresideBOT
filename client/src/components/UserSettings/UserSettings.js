import React, { Component } from 'react';
import './UserSettings.css';

import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardUp,
    MDBCardBody,
    MDBAvatar
} from 'mdbreact';

import Integreations from '../Integrations/Integrations';

class UserSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div id="UserSettings" style={{ marginTop: "2%" }}>
                <Container style={{ marginBottom: "5%" }}>
                <Row className="justify-content-lg-center justify-content-md-center" style={{ marginBottom: "5%" }}>
                    <Col>
                        <MDBCard testimonial style={{ background: "#1a1a1a" }}>
                        <MDBCardUp gradient="peach" />
                        <MDBAvatar className="mx-auto UserSettings_Avatar">
                            <img
                            src={`https://cdn.discordapp.com/avatars/${this.props.userInfo.id}/${this.props.userInfo.avatar}.png`}
                            alt=''
                            />
                        </MDBAvatar>
                        <MDBCardBody style={{ background: "#1a1a1a" }}>
                            <h4 className='card-title'>{this.props.userInfo.username} #{this.props.userInfo.discriminator}</h4>
                            <hr />
                            <p>
                            Account Type: Standard
                            </p>
                            <p>
                            Member Since: Jan 12, 2020
                            </p>
                        </MDBCardBody>
                        </MDBCard>
                    </Col>
                </Row>
                <Row className="justify-content-lg-center justify-content-md-center">
                    <Col>
                    <Integreations />
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default UserSettings;