import React, { Component } from 'react';
import './NavBar.css';

import { Link, withRouter } from 'react-router-dom';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarNav
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

    renderHome = () => this.props.pathname === "/" ? <MDBNavLink to="#">Home</MDBNavLink> : <MDBNavLink link="link" to="/">Home</MDBNavLink>;
    renderGettingStarted = () => this.props.pathname === "/" ? <MDBNavLink to="#">Getting Started</MDBNavLink> : <MDBNavLink link="link" to="/gettingstarted">Getting Started</MDBNavLink>;
    renderCommands = () => this.props.pathname === "/commands" ? <MDBNavLink to="#">Commands</MDBNavLink> : <MDBNavLink link="link" to="/commands">Commands</MDBNavLink>;
    renderPremium = () => this.props.pathname === "/premium" ? <MDBNavLink to="#">Premium</MDBNavLink> : <MDBNavLink link="link" to="/premium">Premium</MDBNavLink>;

    renderLogo() {
        if(this.props.location.pathname !== "/")
        return(<Link to="/"><img src="https://i.imgur.com/efYsW7T.png" alt="" style={{ height: "35px" }}/></Link>);
        else return(<img src="https://i.imgur.com/efYsW7T.png" alt="" style={{ height: "35px" }}/>);
    }

    render() {
        return(
            <div id="NavBar">
                  <MDBNavbar color="black" dark expand="md">
                    <MDBNavbarBrand>
                    {this.renderLogo()}
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} onClick={this.togglePostCollapse} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem>
                        {this.renderHome()}
                        </MDBNavItem>
                        <MDBNavItem>
                        {this.renderGettingStarted()}
                        </MDBNavItem>
                        <MDBNavItem>
                        {this.renderCommands()}
                        </MDBNavItem>
                        <MDBNavItem>
                        {this.renderPremium()}
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                    </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </div>
        );
    }
};

export default withRouter(Navbar);