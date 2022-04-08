import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
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
    faVolumeMute, faMinusCircle, faBook, faMars, faVenus, 
    faShieldAlt, faAddressBook, faAddressCard, faMap, faCheck, 
    faBoxOpen, faCreditCard, faPlus, faEquals, faExchangeAlt, 
    faEye, faMinus, faAngleDown, faArrowCircleLeft, faScroll, 
    faCircle
} from '@fortawesome/free-solid-svg-icons';

import HomePage from './components/pages/HomePage';
import SideNav from './components/pages/SideNav';

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
library.add(faVolumeUp, faVolumeDown, faVolumeMute, faMinusCircle, faBook);
library.add(faMars, faVenus, faShieldAlt, faAddressBook, faAddressCard);
library.add(faMap, faCheck, faBoxOpen, faCreditCard, faPlus);
library.add(faEquals, faExchangeAlt, faEye, faMinus, faAngleDown);
library.add(faArrowCircleLeft, faScroll, faCircle);

class App extends Component {

    _AppRoutes = [
        "/dashboard",
        "/changelogs",
        "/changelogs/:changelogs",
        "/changelogs/:type/:id",
        "/logs",
        "/logs/:logs",
        "/tickets",
        "/tickets/:tickets",
        "/monitor",
        "/monitor/:module",
        "/analytics",
        "/moderation",
        "/moderation/:moderation",
        "/profiles",
        "/profiles/guild",
        "/profiles/guild/:guild",
        "/profiles/user",
        "/profiles/user/:user"
    ];

    constructor() {
        super();
        this.state = {
            userData: null,
            manageGuild: null
        };
        this.getUser = this.getUser.bind(this);
        this.getManageGuild = this.getManageGuild.bind(this);
    };

    componentDidMount() {
        this._isMounted = true;
        this.checkForUser();
    }

    componentWillUnmount = () => this._isMounted = false;

    checkForUser() {
        if(!this._isMounted || !window.localStorage.getItem("token")) return;

        loginServices.verify(window.localStorage.token)
        .then(user => this.setState({ userData: user.data.data }))
        .catch(err => {
            this.setState({ homePageRedirect: true }, () => {
                window.localStorage.clear();
                console.error(err);
            });
            
        });
    }

    getUser = (user) => this.setState({ userData: user });
    getManageGuild = (guild) => this.setState({ manageGuild: guild });

    render() {
        const { userData, manageGuild } = this.state;
        return(
            <div id="App">
            <Router>
                <div className="App_Contents">
                <Route exact path="/" component={() => (<HomePage userData={userData} getUser={this.getUser} />)} />
                <Route exact path={this._AppRoutes} component={() => (<SideNav userData={userData} manageGuild={manageGuild} getManageGuild={this.getManageGuild} />)} />
                {this.state.homePageRedirect ? <Redirect to="/" /> : ''}
                </div>
            </Router>
            </div>
        );
    }
};

export default App;
