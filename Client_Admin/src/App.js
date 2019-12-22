import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { 
    faEnvelope, faUser, faPhone, faArrowCircleRight, faGlobeAmericas, 
    faTachometerAlt, faMagic, faChartLine, faCoins, faInfoCircle, 
    faCrown, faComments, faMusic, faAward, faBolt,
    faSignOutAlt, faCode, faCog, faCogs, faUserAstronaut,
    faTrashAlt, faNewspaper, faBullhorn, faCompactDisc, faClock, 
    faHeadphonesAlt, faArrowAltCircleRight, faTimes, faCrosshairs, faEdit, 
    faLink, faMugHot, faPaperPlane, faDatabase, faHeart, 
    faMapMarkerAlt, faPlayCircle, faPalette, faPhotoVideo, faBars, 
    faMoneyBillAlt, faUsers, faArrowUp, faArrowDown, faPencilAlt, 
    faSearch
} from '@fortawesome/free-solid-svg-icons';

import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import Dashboard from './components/Dashboard/Dashboard';
import DisplayChangelogs from './components/DisplayChangelogs/DisplayChangelogs';
import Footer from './components/Footer/Footer';

import services from './services/apiServices';

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
    faMoneyBillAlt, faUsers, faArrowUp, faArrowDown, faPencilAlt,
    faSearch
);

class App extends Component {

    _isMounted = false;

    constructor() {
        super();
        this.state = {
            userData: {
                id: 123456789,
                username: "Test User"
            },
            logs: null
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getLogs();
    }

    componentWillUnmount = () => this._isMounted = false;

    getLogs() {
        // if(!this.state.userData) return;
        if(!this._isMounted) return setTimeout(() => this.getLogs(), 2000);
        services.getCommandLogs()
        .then(logs => this.setState({ logs: logs.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    render() {
        return(
            <div id="App">
            <Router>
                <div id="App-Contents">
                    <NavBar />
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/dashboard" component={() => (<Dashboard userData={this.state.userData} logs={this.state.logs} />)} />
                    <Route exact path="/changelogs" component={() => (<DisplayChangelogs userData={this.state.userData} logs={this.state.logs} />)} />
                    <Footer />
                </div>
            </Router>
            </div>
        );
    }
};

export default App;