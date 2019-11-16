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
    MDBNavbarNav,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem
} from 'mdbreact';

class Navbar extends Component {

    constructor() {
        super();
        this.state = {
            isOpen: false
        }
    }

    toggleCollapse = () => this.setState({ isOpen: !this.state.isOpen });

    renderHome = () => this.props.pathname === "/" ? <MDBNavLink to="#!">Home</MDBNavLink> : <MDBNavLink link="link" to="/">Home</MDBNavLink>;
    renderCommands = () => this.props.pathname === "/commands" ? <MDBNavLink to="#!">Commands</MDBNavLink> : <MDBNavLink link="link" to="/commands">Commands</MDBNavLink>;
    renderPremium = () => this.props.pathname === "/premium" ? <MDBNavLink to="#!">Premium</MDBNavLink> : <MDBNavLink link="link" to="/premium">Premium</MDBNavLink>;

    render() {
        return(
            <div id="NavBar">
                  <MDBNavbar color="black" dark expand="md">
                    <MDBNavbarBrand>
                    <strong className="white-text">FiresideBOT || Help Docs</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem>
                        {this.renderHome()}
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