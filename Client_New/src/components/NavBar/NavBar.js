import React,  { Component } from 'react';
import './NavBar.css';


import { Link, withRouter, Redirect } from 'react-router-dom';
import {
    MDBNavbar,
    MDBNavLink,
    MDBNavItem,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarNav,
    MDBBtn
} from 'mdbreact';

import SideNav from '../SideNav/SideNav';

import env from '../../env';
import Skin from '../../res/Skin';

class NavBar extends Component {

    DiscordRedirect = `https://discordapp.com/api/oauth2/authorize?client_id=${env.CLIENT_ID}&redirect_uri=${env.REDIRECT}&response_type=code&scope=guilds%20identify%20guilds.join%20email%20messages.read`;
    _helpLink = `https://help.firesidebot.com`;

    constructor(props) {
        super(props);
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
        return(<Link to="/"><img src="https://i.imgur.com/efYsW7T.png" alt="" style={{ height: "35px" }}/></Link>);
        else return(<img src="https://i.imgur.com/efYsW7T.png" alt="" style={{ height: "35px" }}/>);
    }

    renderLoggedIn() { 
        if(!this.props.userData)
            return <MDBBtn color={Skin.hex} style={{ background: Skin.hex }} size="sm" as="a" href={`${this.DiscordRedirect}`}>Login With Discord</MDBBtn>;
        else 
            return <Link to="/dashboard"><MDBBtn color={Skin.hex} style={{ background: Skin.hex }} size="sm">Go To Dashboard</MDBBtn></Link>; 
    }

    renderHomePageNav() {
        return(
            <MDBNavbar color="black" dark expand="md">
                <MDBNavbarBrand>
                {this.renderLogo()}
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} onClick={this.togglePostCollapse} navbar>
                <MDBNavbarNav left>
                    <MDBNavItem>
                        <MDBNavLink to="/">Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <a className="nav-link Ripple-parent active" target="_blank" rel="noopener noreferrer" href={"https://help.firesidebot.com/gettingstarted"}>Getting Started</a>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="/features">Features</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                    <a className="nav-link Ripple-parent active" target="_blank" rel="noopener noreferrer" href={"https://help.firesidebot.com/commands"}>Commands</a>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="/premium">Premium</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                    <a className="nav-link Ripple-parent active" target="_blank" rel="noopener noreferrer" href={"https://discord.gg/TqKHVUa"}>Support Server</a>
                    </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem>
                    {this.renderLoggedIn()}
                    </MDBNavItem>
                </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }

    renderDashboardNav() {
        if(this.props.userData)
            return <SideNav 
                    userData={this.props.userData} 
                    manageServer={this.props.manageServer} 
                    getManageServer={this.props.getManageServer}
                    changelogs={this.props.changelogs} 
                    handleLogout={this.props.handleLogout} 
                    />;
        else return <Redirect to="/" />
    }

    render() {
        let filterArr = ["/", "/features", "/premium", "/faq", "/changelogs"];
        let pathCheck = this.props.location.pathname.split("/").includes("changelogs") || filterArr.includes(this.props.location.pathname);
        return pathCheck ? this.renderHomePageNav() : this.renderDashboardNav();
    }
};

export default withRouter(NavBar);