import React, { Component } from 'react';
import './SideNav.css';

import { Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { 
    MDBNavbar, 
    MDBNavbarNav, 
    MDBNavItem,
    MDBDropdown, 
    MDBDropdownToggle, 
    MDBDropdownMenu, 
    MDBDropdownItem, 
    MDBIcon,
    MDBSideNavCat, 
    MDBSideNavNav, 
    MDBSideNav,
    MDBSideNavLink
} from "mdbreact";

import Dashboard from '../Dashboard/Dashboard';
import Analytics from '../Analytics/Analytics';
import Changelogs from '../Changelogs/Changelogs';
import WorkingChangelogs from '../WorkingChangelogs/WorkingChangelogs';
import CommandLogs from '../CommandLogs/CommandLogs';
import DashboardFooter from '../DashboardFooter/DashboardFooter';

class SideNav extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            toggleStateA: false,
            breakWidth: 1300,
            windowWidth: 0
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.getUserInfo();
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

    getUserInfo() {
        // if(!this._isMounted) return setTimeout(() => this.getUserInfo(), 2000);
        // discordServices.getUserInfo(this.props.userData.discord_id)
        // .then(discordUser => {
        //     this.setState({ 
        //         discordUser: discordUser.data.data, 
        //         avatar: `https://cdn.discordapp.com/avatars/${this.state.userData.discord_id}/${discordUser.data.data.avatar}.png` 
        //     });
        // })
        // .catch(err => console.error(err));
    }

    getGuilds() {
        // if(!this._isMounted) return setTimeout(() => this.getGuilds(), 2000);
        // if(window.location.search) {
        //     guildServices.getGuildInfo(window.location.search.split("&")[1].split("guild_id=")[1])
        //         .then(guild => this.setState({ chosenGuild: guild.data.data }, () => {
        //             this.props.getManageServer(this.state.chosenGuild);
        //         }))
        //         .catch(err => console.error(err));
        // }
        // discordServices.getUserGuilds(this.state.userData.discord_id)
        // .then(guilds => this.setState({ guildData: guilds.data.data.filter(el => el.permissions >= 2146958591), dataReceived: true }))
        // .catch(err => console.error(err));
    }

    handleLogout() {
        // loginServices.logout(this.state.userData.discord_id)
        // .then(() => {
        //     window.localStorage.clear();
        //     this.setState({ logoutRedirect: true }, () => {
        //         this.props.handleLogout();
        //     });
        // })
        // .catch(err => console.error(err));
    }

    renderServerPicker() {
        // return(
        //     <Col xs={8}>
        //     <MDBNavItem>
        //         <ServerPicker 
        //         nav
        //         userData={this.props.userData} 
        //         manageServer={this.props.manageServer}
        //         guildData={this.state.guildData}
        //         getManageServer={this.props.getManageServer} 
        //         togglePostCollapse={this.togglePostCollapse} 
        //         />
        //     </MDBNavItem>
        //     </Col>
        // );
    }

    render() {
        const userData = this.state.userData;
        const manageServer = this.props.manageServer;
        const changelogs = this.props.changelogs;

        return (
            <div className="fixed-sn black-skin">
                <MDBSideNav
                className="SideNav"
                logo="https://i.imgur.com/7zpvSy9.png"
                triggerOpening={this.state.toggleStateA}
                breakWidth={this.state.breakWidth}
                bg="https://i.imgur.com/OrxckTo.png"
                href="/"
                mask="light"
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
                    <MDBSideNavCat name="Changelogs" id="changelog-cat" icon="scroll" className="SideNav-El">
                        <MDBSideNavLink to="/changelogs/working" className="SideNav-Dropdown-El">
                            <FontAwesomeIcon icon="edit" /> Working
                        </MDBSideNavLink>
                        <MDBSideNavLink to="/changelogs/published" className="SideNav-Dropdown-El">
                            <FontAwesomeIcon icon="upload" /> Published
                        </MDBSideNavLink>
                    </MDBSideNavCat>
                    <MDBSideNavLink to="/logs" topLevel className="SideNav-El">
                        <FontAwesomeIcon className="FontAwesomeIcon" icon="coins" />
                        Command Logs
                    </MDBSideNavLink>
                    <MDBSideNavLink to="/error/logs" topLevel className="SideNav-El">
                        <FontAwesomeIcon className="FontAwesomeIcon" icon="exclamation-triangle" />
                        Error Logs
                    </MDBSideNavLink>
                    <br />
                    <MDBSideNavLink to="/community" topLevel className="SideNav-El">
                        <FontAwesomeIcon className="FontAwesomeIcon" icon="comments" />
                        Community
                    </MDBSideNavLink>
                    <MDBSideNavLink to="/support" topLevel className="SideNav-El">
                        <FontAwesomeIcon className="FontAwesomeIcon" icon="question-circle" />
                        Support
                    </MDBSideNavLink>
                </MDBSideNavNav>
                </MDBSideNav>
                <MDBNavbar style={{ paddingLeft: this.state.windowWidth > this.state.breakWidth ? "210px" : "16px" }} double expand="md" fixed="top" scrolling>
                <MDBNavbarNav left>
                    <MDBNavItem>
                        <div
                        onClick={this.handleToggleClickA}
                        key="sideNavToggleA"
                        style={{
                            lineHeight: "20px",
                            marginRight: "1em",
                            verticalAlign: "middle"
                        }}
                        >
                        <MDBIcon icon="bars" color="white" />
                        </div>
                    </MDBNavItem>
                    {this.state.windowWidth > 800 ? this.renderServerPicker() : ''}
                </MDBNavbarNav>
                <MDBNavbarNav right style={{ marginLeft: 0 }}>
                    <Container>
                    <Row>
                        {this.state.windowWidth > 800 ? '' : this.renderServerPicker()}
                        <Col xs={4}>
                            <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                {this.state.avatar ? <Image src={this.state.avatar} roundedCircle style={{ height: "32px", border: "solid 3px #151515" }} /> : <FontAwesomeIcon icon="user" style={{ marginRight: "5%" }} />}
                                </MDBDropdownToggle>
                                <MDBDropdownMenu right={this.state.width > 800 ? true : false} className="dropdown-default SideNav-TopNav__DropDownMenu">
                                <MDBDropdownItem className="SideNav-TopNav-Dropdown-Item-User" style={{ padding: "10px 15px 10px 15px" }}>
                                        <span className="SideNav-TopNav-Dropdown-Item-Span">
                                            {this.state.discordUser ? `${this.state.discordUser.username}#${this.state.discordUser.discriminator}` : ''}
                                        </span>
                                </MDBDropdownItem>
                                <MDBDropdownItem divider />
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
                        </Col>
                    </Row>
                    </Container>
                </MDBNavbarNav>
                </MDBNavbar>
                <main style={{ margin: "0 6%", paddingTop: "5.5rem", paddingLeft: this.state.windowWidth > this.state.breakWidth ? "240px" : "0" }}>
                <Route exact path="/dashboard" component={() => (<Dashboard userData={userData} changelogs={changelogs} manageServer={manageServer} />)} />
                <Route exact path="/analytics" component={() => (<Analytics userData={userData} manageServer={manageServer} />)} />
                <Route exact path="/changelogs/working" component={() => (<WorkingChangelogs userData={this.state.userData} />)} />
                <Route exact path="/changelogs/published" component={() => (<Changelogs userData={this.state.userData} />)} />
                <Route exact path="/logs" component={() => (<CommandLogs userData={this.state.userData} />)} />
                </main>
                <DashboardFooter />
            </div>
        );
    }
}

export default SideNav;