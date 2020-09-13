import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarNav,
    MDBBtn
} from 'mdbreact';

class Navbar extends Component {

    constructor() {
        super();
        this.state = {
            isOpen: false
        }
        this.togglePostCollapse = this.togglePostCollapse.bind(this);
    }

    toggleCollapse = () => this.setState({ isOpen: !this.state.isOpen });
    togglePostCollapse() {
        if(this.state.isOpen)
            this.setState({ isOpen: false })
    }

    renderLogo() {
        if(this.props.location.pathname !== "/")
        return(<Link to="/"><img src="https://i.imgur.com/NnflIQW.png" alt="" style={{ height: "55px" }}/></Link>);
        else return(<img src="https://i.imgur.com/NnflIQW.png" alt="" style={{ height: "55px" }}/>);
    }

    renderLoggedIn() { 
        if(!this.props.userData)
            return <MDBBtn className="Button" size="sm" as="a" href={`${this.DiscordRedirect}`}>Login With Discord</MDBBtn>;
        else 
            return <Link to="/dashboard"><MDBBtn className="Button" size="sm">Go To Dashboard</MDBBtn></Link>; 
    }

    render() {
        return(
            <div id="NavBar">
            <MDBNavbar color="black" dark expand="md">
                <Container>
                    <MDBNavbarBrand>
                    {this.renderLogo()}
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} onClick={this.togglePostCollapse} navbar>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBNavLink to="/">Home</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                        <MDBNavLink to="/gettingstarted">Getting Started</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                        <MDBNavLink to="/commands">Commands</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/premium">Premium</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                        <a className="nav-link Ripple-parent active" target="_blank" rel="noopener noreferrer" href={"https://discord.gg/TqKHVUa"}>Support Server</a>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    </MDBCollapse>
                </Container>
            </MDBNavbar>
            </div>
        );
    }
};

export default withRouter(Navbar);