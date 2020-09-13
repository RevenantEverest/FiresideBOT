import React, { Component } from 'react';
import '../css/HomePage.css';

import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBBtn,
    toast,
    ToastContainer
} from 'mdbreact';

import loginServies from '../../services/loginServices';
import env from '../../env';

class HomePage extends Component {

    DiscordRedirect = `https://discordapp.com/api/oauth2/authorize?client_id=${env.CLIENT_ID}&redirect_uri=${env.REDIRECT}&response_type=code&scope=guilds%20identify%20guilds.join%20email%20messages.read`;
    _isMounted = true;

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this._isMounted = true;
        if(window.location.search && !this.props.userData && !window.localStorage.getItem("token")) this.getToken();
    }

    componentWillUnmount = () => this._isMounted = false;

    getToken() {
        if(!this._isMounted) return;
        let code = window.location.search.split("code=")[1];
        loginServies.loginAdmin(code)
        .then(results => {
            let userData = results.data.data;
            window.localStorage.setItem('token', userData.token);
            this.setState({ userData: userData, isLoggedIn: true }, () => this.props.getUser(userData));
        })
        .catch(err => {
            if(err.response.status === 403) return this.toggleFailureNotify(err.response.data.error);
            else console.error(err);
        });
    }

    toggleFailureNotify = (reason) => toast.error(`${reason}`, { position: "top-center", autoClose: 5000 });

    renderLoginButton() {
        return(
            <MDBBtn rounded type='button' as="a" href={this.DiscordRedirect} className='btn-block z-depth-1 Button'>
                Login
            </MDBBtn>
        );
    }

    renderDashboardButton() {
        return(
            <Link to="/dashboard">
            <MDBBtn rounded type='button' className='btn-block z-depth-1 Button'>
                Go To Dashboard
            </MDBBtn>
            </Link>
        );
    }

    render() {
        return(
            <div id="HomePage">
                <Container className="HomePage_Container">
                <ToastContainer position="top-center" autoClose={5000} newestOnTop hideProgressBar={false} />
                    <Row className="justify-content-center">
                        <Col lg={6}>
                        <div style={{ position: "relative", top: "25%" }}>
                        <MDBCard
                        className='card-image'
                        style={{ backgroundImage: 'url(https://i.imgur.com/ly40SWk.jpg)', }}
                        >
                            <div className='text-white rgba-black-strong py-5 px-5 z-depth-4'>
                            <div className='text-center'>
                                <img src="https://i.imgur.com/ug9huUj.png" alt="" className="HomePage_Logo" />
                                <h3 className='white-text mb-5 mt-4 font-weight-bold'>
                                <strong>FIRESIDE</strong>
                                <a href='#!' className='orange-text font-weight-bold'>
                                    <strong> ADMIN</strong>
                                </a>
                                </h3>
                            </div>
                            <Row className='d-flex align-items-center mb-4'>
                                <div className='text-center mb-3 col-md-12'>
                                {!this.props.userData ? this.renderLoginButton() : this.renderDashboardButton()}
                                </div>
                            </Row>
                            <Col md={12}>
                                <p className='font-small white-text d-flex justify-content-end'>
                                Meant to access the main site?
                                </p>
                            </Col>
                            <Col md={12}>
                                <p className=" font-small d-flex justify-content-end">
                                    <a href='https://firesidebot.com' className='orange-text ml-1 font-weight-bold '>
                                        Go Back
                                    </a>
                                </p>
                            </Col>
                            </div>
                        </MDBCard>
                        </div>
                        </Col>
                    </Row>
                    </Container>
                {this.state.isLoggedIn ? <Redirect to="/dashboard" /> : ''}
            </div>
        );
    }
};

export default HomePage;