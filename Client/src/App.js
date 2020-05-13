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
    faPencilAlt, faSearchPlus, faUserAlt, faArrowUp, faArrowDown, 
    faPlayCircle, faPauseCircle, faForward, faVolumeUp, faVolumeDown, 
    faVolumeMute, faMinusCircle
} from '@fortawesome/free-solid-svg-icons';

import { fab } from '@fortawesome/free-brands-svg-icons';

//Component Imports
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import Features from './components/Features/Features';
import Premium from './components/Premium/Premium';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';
import ChangelogRouter from './components/Changelogs/ChangelogRouter/ChangelogRouter';

//Services Imports
import loginServices from './services/loginServices';

library.add(fab);
library.add(faEnvelope, faUser, faArrowCircleRight, faPhone, faGlobeAmericas);
library.add(faTachometerAlt, faMagic, faChartLine, faCrown, faCoins, faInfoCircle, faComments, faMusic, faAward, faBolt, faSignOutAlt);
library.add(faCode, faCog, faCogs, faUserAstronaut);
library.add(faTrashAlt, faNewspaper, faBullhorn, faCompactDisc, faClock, faHeadphonesAlt, faArrowAltCircleRight, faTimes);
library.add(faCrosshairs, faEdit, faLink, faLightbulb, faSearch);
library.add(faArrowLeft, faArrowRight, faAngleLeft, faAngleRight, faUsers);
library.add(faGem, faQuestionCircle, faPencilAlt, faSearchPlus, faUserAlt);
library.add(faArrowUp, faArrowDown, faPlayCircle, faPauseCircle, faForward);
library.add(faVolumeUp, faVolumeDown, faVolumeMute, faMinusCircle);

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
        this.getChangelogs = this.getChangelogs.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.checkLogin();
    }

    componentWillUnmount = () => this._isMounted = false;

    checkLogin() {
        if(!this._isMounted || !window.localStorage.getItem("token")) return;

        loginServices.verify(window.localStorage.token)
        .then(user => this.setState({ userData: user.data.data }))
        .catch(err => {
            window.localStorage.clear();
            console.error(err);
        });
    }

    getUserData = (user) => this.setState({ userData: user }, () => this.componentDidMount());
    getManageServer = (server) => this.setState({ manageServer: server }, () => this.componentDidMount());
    getChangelogs = (changelogs) => this.setState({ changelogs: changelogs }, () => this.componentDidMount());
    handleLogout = () => this.setState({ userData: null });

    render() {
        let { userData, manageServer } = this.state;
        let getManageServer = this.getManageServer;
        return(
            <div id="App">
                <Router>
                    <div className="App_Contents">
                    <NavBar 
                    userData={userData} 
                    manageServer={manageServer} 
                    getManageServer={getManageServer} 
                    handleLogout={this.handleLogout} 
                    changelogs={this.state.changelogs} 
                    />
                    <Route exact path="/" component={() => (<HomePage userData={userData} getUserData={this.getUserData} />)} />
                    <Route exact path="/features" component={() => (<Features userData={userData} />)} />
                    <Route exact path="/premium" component={() => (<Premium userData={userData} />)} />
                    <Route exact path="/faq" component={() => (<FAQ userData={userData} />)} />
                    <ChangelogRouter userData={userData} getChangelogs={this.getChangelogs} />
                    <Footer />
                    </div>
                </Router>
            </div>
        );
    }
};

export default App;
