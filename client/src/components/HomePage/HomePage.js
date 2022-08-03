import React, { Component } from 'react';
import './HomePage.css';

import AnimatedNumber from 'react-animated-number';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBJumbotron, MDBCardText, MDBBtn } from 'mdbreact';

import Offers from '../Offers/Offers';
import Features from '../Features/Features';
import Testimonials from '../Testimonials/Testimonials';

import discordServices from '../../services/discordServices';

import env from '../../env';

class HomePage extends Component {

    _inviteLink = `https://discordapp.com/oauth2/authorize?client_id=${env.CLIENT_ID}&permissions=8&scope=bot`
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            usersCount: 0
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getDiscordBotUsers();
    }

    componentWillUnmount = () => this._isMounted = false;

    getDiscordBotUsers() {
        if(!this._isMounted) return;
        discordServices.getDiscordUserSize()
        .then(users => this.setState({ usersCount: users.data.data, botInfoDataRecieved: true }))
        .catch(err => console.error(err));
    }

    renderUserCount() {
        return(
            <MDBBtn id="HomePage-UserCount" className="Button" size="md">
                <AnimatedNumber
                className="HomePage-ServerList"
                component="span"
                style={{
                    transition: '0.1s ease out',
                    transitionProperty: 'background-color, color, opacity'
                }}
                stepPrecision={0}
                duration={1000}
                value={this.state.usersCount}
                formatValue={n => 'Serving ' + n.toLocaleString('en') + ' Users'}
                />
            </MDBBtn>
        );
    }

    render() {
        return(
            <div id="HomePage">
                <Container fluid>
                <Row>
                    <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
                    <MDBJumbotron style={{ padding: "0", background: "inherit" }} fluid>
                        <Col className="text-white" style={{ backgroundImage: `url(https://i.imgur.com/CyclXef.png)` }}>
                        <Container>
                        <Row style={{ marginTop: "-20px" }}>
                            <Col className="py-5">
                                <img src="https://i.imgur.com/KR9xQdZ.png" alt="" className="HomePage-Logo" />
                                <h1 className="h1 HomePage-Logo_Text">FiresideBOT</h1>
                                <MDBCardText tag="div">
                                    <h6 className="h6">The all in one Discord Bot guaranteed to bring new life to your server!</h6>
                                    <br />
                                    {this.renderUserCount()}
                                    <MDBBtn className="Discord-Button" size="md" tag="a" target="_blank" rel="noopener noreferrer" href={this._inviteLink}>
                                    Add To Discord
                                    </MDBBtn>
                                </MDBCardText>
                            </Col>
                        </Row>
                        </Container>
                        </Col>
                    </MDBJumbotron>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                    <Features />
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                    <Offers />
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                    <Testimonials />
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default HomePage;