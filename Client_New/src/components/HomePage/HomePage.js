import React, { Component } from 'react';
import './HomePage.css';

import { Redirect } from 'react-router-dom';
import AnimatedNumber from 'react-animated-number';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBJumbotron, MDBCardText, MDBBtn } from 'mdbreact';

import Offers from '../Offers/Offers';
import Features from '../Features/Features';
import Testimonials from '../Testimonials/Testimonials';

import discordServices from '../../services/discordServices';
import loginServies from '../../services/loginServices';

import Logo from '../../res/images/Logo.png';

import Skin from '../../res/Skin';
import env from '../../env';

class HomePage extends Component {

    _inviteLink = `https://discordapp.com/oauth2/authorize?client_id=${env.CLIENT_ID}&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&scope=bot`
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this._isMounted = true;
        if(window.location.search) this.getToken();
        this.getDiscordBotUsers();
    }

    componentWillUnmount() { this._isMounted = false; }

    getToken() {
        let code = window.location.search.split("code=")[1];
        loginServies.handleLogin(code)
        .then(results => {
            window.localStorage.setItem('id', results.data.data.userData.discord_id);
            this.setState({ tokenRecieved: true }, () => this.props.getUserData(results.data.data.userData));
        }).catch(err => console.error(err));
    }

    getDiscordBotUsers() {
        if(!this._isMounted) return setTimeout(() => this.getDiscordBotUsers(), 5000);
        discordServices.getDiscordUserSize()
        .then(users => {
            this.setState({ usersCount: users.data.data, botInfoDataRecieved: true }, () => {
                setTimeout(() => {
                this.getDiscordBotUsers()
                }, 5000);
            });
        })
        .catch(err => {
            console.error(err);
            setTimeout(() => {
                this.getDiscordBotUsers();
            });
        })
    }

    renderUserCount() {
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
                        <Row>
                            <Col className="py-5">
                                <img src={Logo} alt="" className="HomePage-Logo" />
                                <h1 className="h1 HomePage-Logo_Text">FiresideBOT</h1>
                                <MDBCardText tag="div">
                                    <h6 className="h6">The all in one Discord Bot garenteed to bring new life to your server!</h6>
                                    <br />
                                    {this.state.botInfoDataRecieved ? this.renderUserCount() : this.renderBlankUserCount()}
                                    <MDBBtn color="#4a67cf" style={{ background: "#4a67cf" }} size="md" tag="a" target="_blank" rel="noopener noreferrer" href={this._inviteLink}>
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
                {this.state.tokenRecieved ? <Redirect to="/dashboard" /> : ''}
            </div>
        );
    }
};

export default HomePage;