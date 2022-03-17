import React, { Component } from "react";
import '../css/SideNav.css';

import { Link, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from 'react-bootstrap';
import {
    MDBSideNav,
    MDBIcon,
    MDBSideNavNav,
    MDBSideNavCat,
    MDBSideNavLink,
    MDBNavbar,
    MDBNavItem,
    MDBNavbarNav,
    MDBContainer,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdown,
    MDBDropdownItem,
    MDBBtn,
    MDBBadge
} from 'mdbreact';

import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Moderation from './Moderation';
import WorkingChangelogs from "./WorkingChangelogs";
import PublishedChangelogs from './PublishedChangelogs';
import Changelog from '../sections/Changelog';
import OpenTickets from './OpenTickets';
import ClosedTickets from './ClosedTickets'; 
import CommandLogs from './CommandLogs';
import CommandErrorLogs from './CommandErrorLogs';
import MusicMonitor from './MusicMonitor';
import GuildProfiles from './GuildProfiles';
import UserProfiles from './UserProfiles';

import Footer from '../sections/Footer';

import guildServices from '../../services/guildServices';

class SideNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleStateA: false,
            breakWidth: 1300,
            windowWidth: 0,
            switch2: false
        };
    }
    
    componentDidMount() {
        this._isMounted = true;
        this.getGuilds();
        this.handleResize();
        window.addEventListener("resize", this.handleResize);
    }
    
    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener("resize", this.handleResize);
    }
    
    handleResize = () => this.setState({ windowWidth: window.innerWidth });
    handleToggleClickA = () => this.setState({ toggleStateA: !this.state.toggleStateA });
    handleSwitchChange = nr => () => this.setState({ [`switch${nr}`]: !this.state[`switch${nr}`] });

    handleLogout() {
        window.localStorage.clear();
        window.location.pathname = "/";
    }

    getGuilds() {
        if(!this._isMounted) return;
        guildServices.getBotGuilds()
        .then(guilds => this.setState({ guildData: guilds.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    renderUserAvatar() {
        const userData = this.props.userData;
        if(userData.avatar === "") return <FontAwesomeIcon icon="user" style={{ marginRight: "5%" }} />;
        else return <Image src={`https://cdn.discordapp.com/avatars/${userData.discord_id}/${userData.avatar}.png`} roundedCircle style={{ height: "32px", border: "solid 3px #151515" }} />;
    }

    render() {
        const { userData } = this.props;
        
        const navStyle = {
            paddingLeft: this.state.windowWidth > this.state.breakWidth ? "210px" : "16px"
        };
    
        const mainStyle = {
            margin: "0 6%",
            paddingTop: "5.5rem",
            paddingLeft: this.state.windowWidth > this.state.breakWidth ? "240px" : "0"
        };
    
        const specialCaseNavbarStyles = {
            WebkitBoxOrient: "horizontal",
            flexDirection: "row"
        };
        return(
            <div className="fixed-sn black-skin">
            <MDBSideNav
                className="SideNav"
                logo="https://i.imgur.com/ug9huUj.png"
                triggerOpening={this.state.toggleStateA}
                breakWidth={this.state.breakWidth}
                bg="https://i.imgur.com/QF4RJul.jpg"
                mask="strong"
                href="/"
                fixed
            >
                <MDBSideNavNav>
                <MDBSideNavLink to="/dashboard" topLevel className="SideNav-El">
                    <FontAwesomeIcon className="FontAwesomeIcon" icon="tachometer-alt" />
                    Dashboard
                </MDBSideNavLink>
                <MDBSideNavLink to="/analytics" topLevel className="SideNav-El">
                    <FontAwesomeIcon className="FontAwesomeIcon" icon="chart-line" />
                    Analytics
                </MDBSideNavLink>
                <MDBSideNavLink to="/moderation" topLevel className="SideNav-El">
                    <FontAwesomeIcon className="FontAwesomeIcon" icon="bolt" />
                    Moderation
                </MDBSideNavLink>
                <MDBSideNavCat name="Changelogs" id="changelogs-cat" icon="scroll" className="SideNav-El">
                    <MDBSideNavLink to="/changelogs/working" className="SideNav-Dropdown-El">Working Changelogs</MDBSideNavLink>
                    <MDBSideNavLink to="/changelogs/published" className="SideNav-Dropdown-El">Published Changelogs</MDBSideNavLink>
                </MDBSideNavCat>
                <MDBSideNavCat name="Tickets" id="tickets-cat" icon="life-ring" className="SideNav-El">
                    <MDBSideNavLink to="/tickets/open" className="SideNav-Dropdown-El">Open Tickets</MDBSideNavLink>
                    <MDBSideNavLink to="/tickets/closed" className="SideNav-Dropdown-El">Closed Tickets</MDBSideNavLink>
                </MDBSideNavCat>
                <MDBSideNavCat name="Logs" id="logs-cat" icon="book" className="SideNav-El">
                    <MDBSideNavLink to="/logs/command" className="SideNav-Dropdown-El">Command Logs</MDBSideNavLink>
                    <MDBSideNavLink to="/logs/error" className="SideNav-Dropdown-El">Error Logs</MDBSideNavLink>
                </MDBSideNavCat>
                <MDBSideNavCat name="Module Monitor" id="module-cat" icon="server" className="SideNav-El">
                    <MDBSideNavLink to="/monitor/music" className="SideNav-Dropdown-El">Music</MDBSideNavLink>
                    <MDBSideNavLink to="/monitor/currency" className="SideNav-Dropdown-El">Currency</MDBSideNavLink>
                    <MDBSideNavLink to="/monitor/rqanks" className="SideNav-Dropdown-El">Ranks</MDBSideNavLink>
                    <MDBSideNavLink to="/monitor/streamer_roles" className="SideNav-Dropdown-El">Streamer Roles</MDBSideNavLink>
                    <MDBSideNavLink to="/monitor/twitch_tracker" className="SideNav-Dropdown-El">Twitch Tracker</MDBSideNavLink>
                </MDBSideNavCat>
                <MDBSideNavCat name="Profiles" id="logs-cat" icon="users" className="SideNav-El">
                    <MDBSideNavLink to="/profiles/guild" className="SideNav-Dropdown-El">Guild Profiles</MDBSideNavLink>
                    <MDBSideNavLink to="/profiles/user" className="SideNav-Dropdown-El">User Profiles</MDBSideNavLink>
                </MDBSideNavCat>
                </MDBSideNavNav>
            </MDBSideNav>
            <MDBNavbar style={navStyle} double expand="md" fixed="top" scrolling>
                <MDBNavbarNav left>
                <MDBNavItem>
                    <div
                    onClick={this.handleToggleClickA}
                    key="sideNavToggleA"
                    style={{
                        lineHeight: "32px",
                        marginRight: "1em",
                        verticalAlign: "middle"
                    }}
                    >
                    <MDBIcon icon="bars" color="white" size="2x" />
                    </div>
                </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right style={specialCaseNavbarStyles}>
                <MDBNavItem>
                    <Link to="#">
                    <MDBBtn color="elegant" size="sm">
                        <MDBIcon size="lg" icon="bell" />
                        <MDBBadge color="danger" className="ml-2" style={{ padding: "4px", fontSize: "10px" }}>2</MDBBadge>
                    </MDBBtn>
                    </Link>
                </MDBNavItem>
                <MDBNavItem>
                <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                    {userData ? this.renderUserAvatar() : <FontAwesomeIcon icon="user" style={{ marginRight: "5%" }} />}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu right={this.state.width > 800 ? true : false} className="dropdown-default SideNav-TopNav__DropDownMenu">
                    <MDBSideNavLink to="/account" style={{ padding: 0 }}>
                    <MDBDropdownItem className="SideNav-TopNav-Dropdown-Item" style={{ padding: "10px 15px 10px 15px" }}>
                            <FontAwesomeIcon className="FontAwesomeIcon SideNav-TopNav-Dropdown-Item-Span" icon="user-alt" />
                            <span className="SideNav-TopNav-Dropdown-Item-Span">Account</span>
                    </MDBDropdownItem>
                    </MDBSideNavLink>
                    <MDBDropdownItem divider />
                    <MDBDropdownItem className="SideNav-TopNav-Dropdown-Item" onClick={() => this.handleLogout()}>
                        <FontAwesomeIcon className="FontAwesomeIcon SideNav-TopNav-Dropdown-Item-Span" icon="sign-out-alt" />
                        <span className="SideNav-TopNav-Dropdown-Item-Span">Logout</span>
                    </MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
                </MDBNavItem>
                </MDBNavbarNav>
            </MDBNavbar>
            <main style={mainStyle}>
                <MDBContainer fluid className="mt-5">
                    <Route exact path="/dashboard" component={() => (<Dashboard userData={userData} />)} />
                    <Route exact path="/analytics" component={() => (<Analytics userData={userData} />)} />
                    <Route exact path="/moderation" component={() => (<Moderation userData={userData} />)} />
                    <Route exact path="/changelogs/working" component={() => (<WorkingChangelogs userData={userData} />)} />
                    <Route exact path="/changelogs/published" component={() => (<PublishedChangelogs userData={userData} />)} />
                    <Route path={["/changelogs/working/:id", "/changelogs/published/:id"]} component={Changelog} />
                    <Route exact path="/tickets/open" component={() => (<OpenTickets userData={userData} />)} />
                    <Route exact path="/tickets/closed" component={() => (<ClosedTickets userData={userData} />)} />
                    <Route exact path="/logs/command" component={() => (<CommandLogs userData={userData} />)} />
                    <Route exact path="/logs/error" component={() => (<CommandErrorLogs userData={userData} />)} />
                    <Route exact path="/monitor/music" component={() => (<MusicMonitor userData={userData} />)} />
                    <Route exact path="/profiles/guild" component={() => (<GuildProfiles userData={userData} />)} />
                    <Route exact path="/profiles/user" component={() => (<UserProfiles userData={userData} />)} />
                </MDBContainer>
            </main>
            <Footer />
            </div>
        );
    }
};

export default SideNav;