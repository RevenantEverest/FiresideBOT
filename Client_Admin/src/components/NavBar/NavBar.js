import React, { Component } from 'react';
import './NavBar.css';

import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from 'mdbreact';

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.togglePostCollapse = this.togglePostCollapse.bind(this);
    }

    toggleCollapse = () => this.setState({ isOpen: !this.state.isOpen });
    togglePostCollapse() {
        if(this.state.isOpen)
            this.setState({ isOpen: false })
    }

    render() {
        return(
            <div id="NavBar">
                  <MDBNavbar color="black" dark expand="md">
                    <MDBNavbarBrand>
                    <strong className="white-text">Fireside Admin</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem onClick={this.togglePostCollapse}>
                        <MDBNavLink to="/">Home</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem onClick={this.togglePostCollapse}>
                        <MDBNavLink to="/dashboard">Dashboard</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem onClick={this.togglePostCollapse}>
                        <MDBNavLink to="/changelogs">ChangeLogs</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                        <MDBDropdown>
                            <MDBDropdownToggle nav caret>
                            <FontAwesomeIcon icon="user" />
                            </MDBDropdownToggle>
                            <MDBDropdownMenu className="dropdown-default">
                            <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                            <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                            <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                            <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </div>
        );
    }
};

export default withRouter(NavBar);