import React,  { Component } from 'react';
import './NavBar.css';
import env from '../../env';
import { Link, Redirect } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

class NavBar extends Component {

    DiscordRedirect = `https://discordapp.com/api/oauth2/authorize?client_id=${env.CLIENT_ID}&redirect_uri=${env.REDIRECT}&response_type=code&scope=guilds%20identify%20guilds.join%20email%20messages.read`;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            isLoggedIn: this.props.isLoggedIn,
            loginRedirect: false
        }
    }

    componentDidMount() {
        console.log(this.props.userData)
    }

    renderLoggedIn() { return(<Navbar.Text style={{ color: '#cccccc' }}>Signed in as: {this.state.userData.discord_username}</Navbar.Text>); }

    handleLogin() {
        this.setState({ loginRedirect: true }, () => {
            this.props.updateDisplay();
        });
    }

    render() {
        return(
            <Navbar id="NavBar">
                <Navbar.Toggle />
                <Nav>
                    <Nav.Item className="NavBar-Element">
                        <Link to="/features">
                            <p>Features</p>
                        </Link>
                    </Nav.Item>
                    <Nav.Item className="NavBar-Element">
                        <Link to="/documentation">
                            <p>Documentation</p>
                        </Link>
                    </Nav.Item>
                    <Nav.Item className="NavBar-Element">
                        <Link to="/premium">
                            <p>Premium</p>
                        </Link>
                    </Nav.Item>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    {this.state.isLoggedIn ? this.renderLoggedIn() : <Button as="a" className="NavBar-Login" href={`${this.DiscordRedirect}`}>Login With Discord</Button>}
                    {this.state.loginRedirect ? <Redirect to="dashboard" /> : ''}
                </Navbar.Collapse>
            </Navbar>
        );
    }
};

export default NavBar;