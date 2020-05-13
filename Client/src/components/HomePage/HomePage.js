import React, { Component } from 'react';
import './HomePage.css';

import { Redirect } from 'react-router-dom';
import AnimatedNumber from 'react-animated-number';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBJumbotron, MDBCardText, MDBBtn } from 'mdbreact';

import Offers from '../Offers/Offers';
import Features from '../Features/Features';
import Testimonials from '../Testimonials/Testimonials';

import loginServies from '../../services/loginServices';
import discordServices from '../../services/discordServices';

import Skin from '../../res/Skin';
import env from '../../env';

class HomePage extends Component {

    _inviteLink = `https://discordapp.com/oauth2/authorize?client_id=${env.CLIENT_ID}&permissions=8&scope=bot`
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this._isMounted = true;
        if(window.location.search && !this.props.userData && !window.localStorage.getItem("token")) this.getToken();
        this.getDiscordBotUsers();
    }

    componentWillUnmount = () => this._isMounted = false;

    getToken() {
        if(!this._isMounted) return setTimeout(() => this.getToken(), 2000);
        let code = window.location.search.split("code=")[1];
        loginServies.handleLogin(code)
        .then(results => {
            let userData = results.data.data;
            window.localStorage.setItem('token', userData.token);
            this.setState({ userData: userData, isLoggedIn: true }, () => this.props.getUserData(userData));
        })
        .catch(err => console.error(err));
    }

    getDiscordBotUsers() {
        discordServices.getDiscordUserSize()
        .then(users => {
            if(!this._isMounted) return;
            this.setState({ usersCount: users.data.data, botInfoDataRecieved: true }, () => {
                setTimeout(() => this.getDiscordBotUsers(), 10000);
            });
        })
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

    renderBlankUserCount() {
        return(
            <MDBBtn id="HomePage-UserCount" color={Skin.hex} style={{ background: Skin.hex }} size="md">
                <AnimatedNumber
                className="HomePage-ServerList"
                component="span"
                style={{
                    transition: '0.1s ease out',
                    transitionProperty: 'background-color, color, opacity'
                }}
                stepPrecision={0}
                duration={1000}
                value={0}
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
                                    {this.state.botInfoDataRecieved ? this.renderUserCount() : this.renderBlankUserCount()}
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
                {this.state.isLoggedIn ? <Redirect to="/dashboard" /> : ''}
            </div>
        );
    }
};

export default HomePage;