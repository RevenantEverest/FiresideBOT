import React, { Component } from "react";
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

import ServerPicker from '../../ServerPicker/ServerPicker';
import Dashboard from '../../Dashboard/Dashboard';
import Analytics from '../../Analytics/Analytics';
import CustomCommands from '../../CustomCommands/CustomCommands';
import Ranks from '../../Ranks/Ranks';
import RankTiers from '../../Ranks/RankTiers/RankTiers';
import RankSettings from '../../Ranks/RankSettings/RankSettings';
import AutoDJ from '../../AutoDJ/AutoDJ';
import Playlists from '../../Playlists/Playlists';
import SinglePlaylist from '../../SinglePlaylist/SinglePlaylist';
import UserPlaylists from '../../UserPlaylists/UserPlaylists';
import GuildPlaylists from '../../GuildPlaylists/GuildPlaylists';
import Economy from '../../Economy/Economy';
import EconomySettings from '../../Economy/EconomySettings/EconomySettings';
import Moderation from '../../Moderation/Moderation';
import Trackers from '../../Trackers/Trackers';
import Settings from '../../Settings/Settings';
import UserSettings from '../../UserSettings/UserSettings';
import Community from '../../Community/Community';
import Support from '../../Support/Support';
import DashboardFooter from '../../Dashboard/DashboardFooter/DashboardFooter';

import discordServices from '../../../services/discordServices';
import guildServices from '../../../services/GuildServices/guildServices';

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
        if(!this._isMounted) return setTimeout(() => this.getUserInfo(), 2000);
        discordServices.getUserInfo(this.props.userData.discord_id)
        .then(discordUser => {
            this.setState({ 
                discordUser: discordUser.data.data, 
                avatar: `https://cdn.discordapp.com/avatars/${this.state.userData.discord_id}/${discordUser.data.data.avatar}.png` 
            });
        })
        .catch(err => console.error(err));
    }

    getGuilds() {
        if(!this._isMounted) return setTimeout(() => this.getGuilds(), 2000);
        if(window.location.search) {
            guildServices.getGuildInfo(window.location.search.split("&")[1].split("guild_id=")[1])
                .then(guild => this.setState({ chosenGuild: guild.data.data }, () => {
                    this.props.getManageServer(this.state.chosenGuild);
                }))
                .catch(err => console.error(err));
        }
        discordServices.getUserGuilds(this.state.userData.discord_id)
        .then(guilds => this.setState({ guildData: guilds.data.data.filter(el => el.permissions >= 2146958591), dataReceived: true }))
        .catch(err => console.error(err));
    }

    handleLogout() {
        window.localStorage.clear();
        this.setState({ logoutRedirect: true }, () => {
            this.props.handleLogout();
        });
    }

    renderServerPicker() {
        return(
            <Col xs={8}>
            <MDBNavItem>
                <ServerPicker 
                nav
                userData={this.props.userData} 
                manageServer={this.props.manageServer}
                guildData={this.state.guildData}
                getManageServer={this.props.getManageServer} 
                togglePostCollapse={this.togglePostCollapse} 
                />
            </MDBNavItem>
            </Col>
        );
    }

    render() {
        const userData = this.state.userData;
        const manageServer = this.props.manageServer;
        const changelogs = this.props.changelogs;

        return (
            <div className="fixed-sn black-skin">
                <MDBSideNav
                className="SideNav"
                logo="https://i.imgur.com/NnflIQW.png"
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
                    <MDBSideNavLink to="/customcommands" topLevel className="SideNav-El">
                        <FontAwesomeIcon className="FontAwesomeIcon" icon="magic" />
                        Custom Commands
                    </MDBSideNavLink>
                    <MDBSideNavLink to="/analytics" topLevel className="SideNav-El">
                        <FontAwesomeIcon className="FontAwesomeIcon" icon="chart-line" />
                        Analytics
                    </MDBSideNavLink>
                    <MDBSideNavLink to="/ranks" topLevel className="SideNav-El">
                        <FontAwesomeIcon className="FontAwesomeIcon" icon="award" />
                        Ranks
                    </MDBSideNavLink>
                    <MDBSideNavCat
                    name="Music"
                    id="music-cat"
                    icon="music"
                    className="SideNav-El"
                    >
                    <MDBSideNavLink to="/autodj" className="SideNav-Dropdown-El">
                        Auto DJ
                    </MDBSideNavLink>
                    <MDBSideNavLink to="/playlists" className="SideNav-Dropdown-El">
                        Playlists
                    </MDBSideNavLink>
                    </MDBSideNavCat>
                    <MDBSideNavLink to="/economy" topLevel className="SideNav-El">
                        <FontAwesomeIcon className="FontAwesomeIcon" icon="coins" />
                        Economy
                    </MDBSideNavLink>
                    <MDBSideNavLink to="/moderation" topLevel className="SideNav-El">
                        <FontAwesomeIcon className="FontAwesomeIcon" icon="bolt" />
                        Moderation
                    </MDBSideNavLink>
                    <MDBSideNavLink to="/trackers" topLevel className="SideNav-El">
                        <FontAwesomeIcon className="FontAwesomeIcon" icon="crosshairs" />
                        Trackers
                    </MDBSideNavLink>
                    <MDBSideNavLink to="/settings" topLevel className="SideNav-El">
                        <FontAwesomeIcon className="FontAwesomeIcon" icon="cogs" />
                        Server Settings
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
                        <MDBIcon icon="bars" color="white" style={{  }} />
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
                <Route exact path="/customcommands" component={() => (<CustomCommands userData={userData} manageServer={manageServer} />)} />
                <Route exact path="/analytics" component={() => (<Analytics userData={userData} manageServer={manageServer} />)} />
                <Route exact path="/ranks" component={() => (<Ranks userData={userData} manageServer={manageServer} />)} />
                <Route exact path="/ranks/tiers" component={() => (<RankTiers userData={userData} manageServer={manageServer} />)} />
                <Route exact path="/ranks/settings" component={() => (<RankSettings userData={userData} manageServer={manageServer} />)} />
                <Route exact path="/autodj" component={() => (<AutoDJ userData={userData} manageServer={manageServer} userInfo={this.state.discordUser} />)} />
                <Route exact path="/playlists" component={() => (<Playlists userData={userData} manageServer={manageServer} />)} />
                <Route exact path="/playlists/guild" component={() => (<GuildPlaylists userData={userData} manageServer={manageServer} />)} />
                <Route exact path="/playlists/user" component={() => (<UserPlaylists userData={userData} manageServer={manageServer} />)} />
                <Route path="/playlists/guild/:playlist_name" component={SinglePlaylist} />
                <Route path="/playlists/user/:playlist_name" component={SinglePlaylist} />
                <Route exact path="/economy" component={() => (<Economy userData={userData} manageServer={manageServer} />)} />
                <Route exact path="/economy/settings" component={() => (<EconomySettings userData={userData} manageServer={manageServer} />)} />
                <Route exact path="/moderation" component={() => (<Moderation userData={userData} manageServer={manageServer} />)} />
                <Route exact path="/trackers" component={() => (<Trackers userData={userData} manageServer={manageServer} />)} />
                <Route exact path="/settings" component={() => (<Settings userData={userData} manageServer={manageServer} />)} />
                <Route exact path="/account" component={() => (<UserSettings userData={userData} userInfo={this.state.discordUser} />)} />
                <Route exact path="/community" component={() => (<Community userData={userData} userInfo={this.state.discordUser} />)} />
                <Route exact path="/support" component={() => (<Support userData={userData} userInfo={this.state.discordUser} />)} />
                </main>
                <DashboardFooter />
            </div>
        );
    }
}

export default SideNav;