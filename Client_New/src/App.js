import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';

import { 
    faEnvelope, faUser, faPhone, faArrowCircleRight, faGlobeAmericas, 
    faTachometerAlt, faMagic, faChartLine, faCoins, faInfoCircle, 
    faCrown, faComments, faMusic, faAward, faBolt,
    faSignOutAlt, faCode, faCog, faCogs, faUserAstronaut,
    faTrashAlt, faNewspaper, faBullhorn, faCompactDisc, faClock, 
    faHeadphonesAlt, faArrowAltCircleRight, faTimes, faCrosshairs, faEdit, 
    faLink, faLightbulb, faSearch, faArrowLeft, faArrowRight, 
    faAngleLeft, faAngleRight, faUsers, faGem, faQuestionCircle, 
    faPencilAlt, faSearchPlus
} from '@fortawesome/free-solid-svg-icons';

import { fab } from '@fortawesome/free-brands-svg-icons';

//Component Imports
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import Features from './components/Features/Features';
import Premium from './components/Premium/Premium';
import Changelogs from './components/Changelogs/Changelogs';
import SingleChangeLog from './components/SingleChangelog/SingleChangelog';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';

//Services Imports
import loginServices from './services/loginServices';
import changelogServices from './services/changelogServices';

library.add(fab);
library.add(faEnvelope, faUser, faArrowCircleRight, faPhone, faGlobeAmericas);
library.add(faTachometerAlt, faMagic, faChartLine, faCrown, faCoins, faInfoCircle, faComments, faMusic, faAward, faBolt, faSignOutAlt);
library.add(faCode, faCog, faCogs, faUserAstronaut);
library.add(faTrashAlt, faNewspaper, faBullhorn, faCompactDisc, faClock, faHeadphonesAlt, faArrowAltCircleRight, faTimes);
library.add(faCrosshairs, faEdit, faLink, faLightbulb, faSearch);
library.add(faArrowLeft, faArrowRight, faAngleLeft, faAngleRight, faUsers);
library.add(faGem, faQuestionCircle, faPencilAlt, faSearchPlus);

class App extends Component {

    _isMounted = false;

    constructor() {
        super();
        this.state = {
            userData: null,
            manageServer: null,
            displayApp: false,
            homePageRedirect: false
        }
        this.getUserData = this.getUserData.bind(this);
        this.getManageServer = this.getManageServer.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.checkLogin();
        this.getChangeLogs();
    }

    componentWillUnmount = () => this._isMounted = false;

    checkLogin() {
        if(!this._isMounted) return setTimeout(() => this.checkLogin(), 2000);
        if(window.localStorage.id && !this.state.isLoggedIn)
            loginServices.getUserData(window.localStorage.id)
            .then(results => this.setState({ userData: results.data.data }))
            .catch(err => console.log(err));
    }

    getChangeLogs() {
        if(!this._isMounted) return setTimeout(() => this.getChangeLogs(), 2000);
        changelogServices.getChangeLogs()
        .then(changelogs => this.setState({ changelogs: changelogs.data.data }))
        .catch(err => console.error(err));
    }

    getUserData = (user) => this.setState({ userData: user }, () => this.componentDidMount());
    getManageServer = (server) => this.setState({ manageServer: server }, () => this.componentDidMount());
    handleLogout = () => this.setState({ userData: null });

    routeChangeLogs() {
        let ChangeLogs = this.state.changelogs.map((el, idx) => {
            return <Route key={idx} exact path={`/changelogs/v${el.version}`} component={() => (<SingleChangeLog changelog={el} />)} />
        });

        return ChangeLogs;
    }

    render() {
        let userData = this.state.userData;
        let manageServer = this.state.manageServer;
        let getManageServer = this.getManageServer;
        return(
            <div id="App">
                <Router>
                    <div className="App_Contents">
                    <NavBar userData={userData} manageServer={manageServer} getManageServer={getManageServer} handleLogout={this.handleLogout} changelogs={this.state.changelogs} />
                    <Route exact path="/" component={() => (<HomePage userData={userData} getUserData={this.getUserData} />)} />
                    <Route exact path="/features" component={() => (<Features userData={userData} />)} />
                    <Route exact path="/premium" component={() => (<Premium userData={userData} />)} />
                    <Route exact path="/faq" component={() => (<FAQ userData={userData} />)} />
                    {this.state.changelogs ? this.routeChangeLogs() : ''}
                    {this.state.changelogs ? <Route exact path="/changelogs" component={() => (<Changelogs userData={userData} changelogs={this.state.changelogs} />)} /> : ''}
                    <Footer />
                    </div>
                </Router>
            </div>
        );
    }
};

export default App;
