import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';

import { 
    faEnvelope, faUser, faPhone, faArrowCircleRight, 
    faGlobeAmericas, faTachometerAlt, faMagic, faChartLine, 
    faCoins, faInfoCircle, faCrown, faComments, faMusic, faAward, faBolt,
    faSignOutAlt, faCode, faCog, faCogs, faUserAstronaut,
    faTrashAlt, faNewspaper, faBullhorn, faCompactDisc, faClock, faHeadphonesAlt, faArrowAltCircleRight, faTimes, faCrosshairs, faEdit, faLink
} from '@fortawesome/free-solid-svg-icons';

import { fab } from '@fortawesome/free-brands-svg-icons';

//Component Imports
import HomePage from './components/HomePage/HomePage';
import Dashboard from './components/Dashboard/Dashboard';
import DefaultCommands from './components/DefaultCommands/DefaultCommands';
import Analytics from './components/Analytics/Analytics';
import Ranks from './components/Ranks/Ranks';
import RankTiers from './components/RankTiers/RankTiers';
import RankSettings from './components/RankSettings/RankSettings';
import Playlists from './components/Playlists/Playlists';
import SinglePlaylist from './components/SinglePlaylist/SinglePlaylist';
import UserPlaylists from './components/UserPlaylists/UserPlaylists';
import GuildPlaylists from './components/GuildPlaylists/GuildPlaylists';
import Economy from './components/Economy/Economy';
import EconomySettings from './components/EconomySettings/EconomySettings';
import Trackers from './components/Trackers/Trackers';
import Settings from './components/Settings/Settings';
import NavBar from './components/NavBar/NavBar';
import SideNav from './components/SideNav/SideNav';
import TopNav from './components/TopNav/TopNav';
import Footer from './components/Footer/Footer';

//BootStrap Imports
import { Container, Row, Col } from 'react-bootstrap';

//Services Imports
import loginServices from './services/loginServices';

library.add(fab);
library.add(faEnvelope, faUser, faArrowCircleRight, faPhone, faGlobeAmericas);
library.add(faTachometerAlt, faMagic, faChartLine, faCrown, faCoins, faInfoCircle, faComments, faMusic, faAward, faBolt, faSignOutAlt);
library.add(faCode, faCog, faCogs, faUserAstronaut);
library.add(faTrashAlt, faNewspaper, faBullhorn, faCompactDisc, faClock, faHeadphonesAlt, faArrowAltCircleRight, faTimes);
library.add(faCrosshairs, faEdit, faLink);

class App extends Component {

    _isMounted = false;

    constructor() {
        super();
        this.state = {
            userData: null,
            manageServer: null,
            isLoggedIn: false,
            displayApp: false,
            homePageRedirect: false
        }
        this.updateDisplay = this.updateDisplay.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.getManageServer = this.getManageServer.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        if(window.location.pathname === "/" && !window.localStorage.id) this.updateDisplay(false);
        if(window.localStorage.id && !this.state.isLoggedIn) {
            loginServices.getUserData(window.localStorage.id)
              .then(results => this.setState({ userData: results.data.data, isLoggedIn: true }, () => this.renderHomePage()))
              .catch(err => console.log(err));
        }
    }

    componentWillUnmount = () => this._isMounted = false;

    getUserData = (user) => this.setState({ userData: user, isLoggedIn: true }, () => this.updateDisplay(true));
    getManageServer = (server) => this.setState({ manageServer: server }, () => this.componentDidMount());
    updateDisplay = (display) => this.setState({ displayApp: display });
    handleLogout = () => this.setState({ isLoggedIn: false });

    renderHomePage() {
        return(
            <Container fluid style={{ marginLeft: '0', marginRight: '0', paddingLeft: '0', paddingRight: '0' }}>
            <Row>
                <Col>
                <NavBar isLoggedIn={this.state.isLoggedIn} userData={this.state.userData} updateDisplay={this.updateDisplay} />
                </Col>
            </Row>
            <Row>
                <Col style={{ paddingLeft: "0", paddingRight: "0"}}>
                <Route exact path="/" component={() => (<HomePage userData={this.state.userData} isLoggedIn={this.state.isLoggedIn} getUserData={this.getUserData} />)} />
                </Col>
            </Row>
            </Container>
        );
    }

    renderApp() {
        return(
            <Container fluid style={{ marginLeft: '0', marginRight: '0', paddingLeft: '0', paddingRight: '0' }}>
            <Row >
                <Col lg={2} md={5} sm={1}>
                    <SideNav updateDisplay={this.updateDisplay} />
                </Col>
                <Col  style={{ paddingLeft: "0", paddingRight: "0"}}>
                    <Container fluid style={{ marginLeft: '0', marginRight: '0', paddingLeft: '0', paddingRight: '0' }}>
                    <Row>
                        <TopNav 
                        userData={this.state.userData} 
                        getManageServer={this.getManageServer} 
                        manageServer={this.state.manageServer} 
                        componentDidMount={this.componentDidMount}
                        handleLogout={this.handleLogout}
                        />
                    </Row>
                    <Row>
                        <Route exact path="/dashboard" component={() => (<Dashboard userData={this.state.userData} manageServer={this.state.manageServer} /> )} />
                        <Route exact path="/commands/default" component={() => (<DefaultCommands userData={this.state.userData} manageServer={this.state.manageServer} /> )} />
                        <Route exact path="/analytics" component={() => (<Analytics userData={this.state.userData} manageServer={this.state.manageServer} /> )} />
                        <Route exact path="/ranks" component={() => (<Ranks userData={this.state.userData} manageServer={this.state.manageServer} /> )} />
                        <Route exact path="/ranks/tiers" component={() => (<RankTiers userData={this.state.userData} manageServer={this.state.manageServer} /> )} />
                        <Route exact path="/ranks/settings" component={() => (<RankSettings userData={this.state.userData} manageServer={this.state.manageServer} /> )} />
                        <Route exact path="/playlists" component={() => (<Playlists userData={this.state.userData} manageServer={this.state.manageServer} /> )} />
                        <Route exact path="/playlists/guild" component={() => (<GuildPlaylists userData={this.state.userData} manageServer={this.state.manageServer} /> )} />
                        <Route exact path="/playlists/user" component={() => (<UserPlaylists userData={this.state.userData} manageServer={this.state.manageServer} /> )} />
                        <Route path="/playlists/guild/:playlist_name" component={SinglePlaylist} />
                        <Route path="/playlists/user/:playlist_name" component={SinglePlaylist} />
                        <Route exact path="/economy" component={() => (<Economy userData={this.state.userData} manageServer={this.state.manageServer} /> )} />
                        <Route exact path="/economy/settings" component={() => (<EconomySettings userData={this.state.userData} manageServer={this.state.manageServer} /> )} />
                        <Route exact path="/trackers" component={() => (<Trackers userData={this.state.userData} manageServer={this.state.manageServer} /> )} />
                        <Route exact path="/settings" component={() => (<Settings userData={this.state.userData} manageServer={this.state.manageServer} /> )} />
                    </Row>
                    <Row>
                        <Footer />
                    </Row>
                    </Container>
                </Col>
            </Row>
            </Container>
        );
    }

    render() {
        return(
            <div id="App">
                <Router>
                    <div className="App_Contents">
                        {!this.state.isLoggedIn ? (window.location.pathname !== "/" && !window.location.search ? <Redirect to="/" /> : this.renderHomePage()) : ''}
                        {this.state.isLoggedIn ? (window.location.pathname !== "/" ? this.renderApp() : this.renderHomePage() ) : ''}
                    </div>
                </Router>
            </div>
        );
    }
};

export default App;