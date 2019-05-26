import React, { Component } from 'react';
import './HomePage.css';
import { Redirect } from 'react-router-dom';
import AnimatedNumber from 'react-animated-number';
import { Jumbotron, Container, Button } from 'react-bootstrap';

//Component Imports
import Offers from '../Offers/Offers';
import Footer from '../Footer/Footer';

//Services Imports
import discordServices from '../../services/discordServices';
import loginServies from '../../services/loginServices';

//Image Imports
import Logo from '../../res/images/Logo.png';

class HomePage extends Component {

    _inviteLink = "https://discordapp.com/oauth2/authorize?client_id=441338104545017878&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&scope=bot"
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
            <Button id="HomePage-UserCount">
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
            </Button>
        );
    }

    renderBlankUserCount() {
        return(
            <Button id="HomePage-UserCount">
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
            </Button>
        );
    }

    render() {
        return(
            <div id="HomePage">
                <Jumbotron fluid id="HomePage">
                    <Container id="HomePage-Container" xs={3} sm={3} md={3}>
                        <img src={Logo} alt="" />
                        <h1>FiresideBOT</h1>
                        <p>
                        A multipurpose bot utilizing Discord.js
                        </p>
                        {this.state.botInfoDataRecieved ? this.renderUserCount() : this.renderBlankUserCount()}
                        <Button className="HomePage-AddToDiscord" as="a" target="_blank" rel="noopener noreferrer" href={this._inviteLink}>Add To Discord</Button>
                    </Container>
                    {this.state.tokenRecieved ? <Redirect to="/dashboard" /> : ''}
                    {this.state.isLoggedIn ? <Redirect to="/dashboard" /> : ''}
                </Jumbotron>
                <Offers />
                <Footer />
            </div>
        );
    }
};

export default HomePage;