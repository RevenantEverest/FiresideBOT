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
    faLink, faMugHot, faPaperPlane, faDatabase, faHeart, 
    faMapMarkerAlt, faPlayCircle, faPalette, faPhotoVideo, faBars, 
    faMoneyBillAlt, faUsers, faArrowUp, faArrowDown, faFolderOpen, 
    faSearch, faGem, faQuestionCircle, faShieldAlt, faRecordVinyl
} from '@fortawesome/free-solid-svg-icons';

import { fab } from '@fortawesome/free-brands-svg-icons';

import NavBar from './components/sections/NavBar';
import HomePage from './components/pages/HomePage';
import FAQ from './components/pages/FAQ';
import Premium from './components/pages/Premium';
import SideNav from './components/sections/SideNav';
import Footer from './components/sections/Footer';

import commandServices from './services/commandServices';

library.add(
    fab,
    faEnvelope, faUser, faArrowCircleRight, faPhone, faGlobeAmericas,
    faTachometerAlt, faMagic, faChartLine, faCrown, faCoins,
    faInfoCircle, faComments, faMusic, faAward, faBolt,
    faSignOutAlt, faCode, faCog, faCogs, faUserAstronaut,
    faTrashAlt, faNewspaper, faBullhorn, faCompactDisc, faClock,
    faHeadphonesAlt, faArrowAltCircleRight, faTimes, faCrosshairs, faEdit,
    faLink, faMugHot, faPaperPlane, faDatabase, faHeart,
    faMapMarkerAlt, faPlayCircle, faPalette, faPhotoVideo, faBars,
    faMoneyBillAlt, faUsers, faArrowUp, faArrowDown, faFolderOpen,
    faSearch, faGem, faQuestionCircle, faShieldAlt, faRecordVinyl
);

class App extends Component {

    _isMounted = false;

    _SideNavRoutes = [
        "/commands",
        "/commands/:commands", 
        "/gettingstarted",
        "/whatsnew",
        "/categories",
        "/categories/:categories"
    ];

    _FooterRoutes = [
        "/",
        "/signup",
        "/login",
        "/features",
        "/pricing",
        "/faq",
        "/premium"
    ];

    constructor() {
        super();
        this.state = {};
        this.getChangelogs = this.getChangelogs.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getCommands();
    }

    componentWillUnmount = () => this._isMounted = false;

    getChangelogs = (changelogs) => this.setState({ changelogs: changelogs });
    getCommands() {
        if(!this._isMounted || window.location.search) return;
        commandServices.getCommands()
        .then(commands => this.setState({ commands: commands.data.data }))
        .catch(err => console.error(err));
    }

    render() {
        return(
            <div id="App">
            <Router>
                <div id="App_Contents">
                <Route exact path={this._FooterRoutes} component={() => (<NavBar />)} />
                <Route exact path="/" component={() => (<HomePage />)} />
                <Route exact path="/faq" component={() => (<FAQ />)} />
                <Route exact path="/premium" component={() => (<Premium />)} />
                <Route path={this._SideNavRoutes} component={() => (<SideNav commands={this.state.commands} />)} />
                <Route exact path={this._FooterRoutes} component={() => (<Footer />)} />
                {/* <ChangelogRouter getChangelogs={this.getChangelogs} /> */}
                </div>
            </Router>
            </div>
        );
    }
};

export default App;
