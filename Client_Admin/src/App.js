import React, { Component } from 'react';

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
    faSearch, faExclamationTriangle, faScroll, faQuestionCircle, faUpload
} from '@fortawesome/free-solid-svg-icons';

import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';

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
    faSearch, faExclamationTriangle, faScroll, faQuestionCircle, faEdit,
    faUpload
);

class App extends Component {

    constructor() {
        super();
        this.state = {
            userData: {
                id: 123456789,
                username: "Test User"
            }
        }
    }

    render() {
        return(
            <div id="App">
            <Router>
                <div id="App-Contents">
                    <NavBar />
                    <Route exact path="/" component={HomePage} />
                    <Footer />
                </div>
            </Router>
            </div>
        );
    }
};

export default App;