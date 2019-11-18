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
    faMoneyBillAlt, faUsers, faArrowUp, faArrowDown, faFolderOpen, 
    faSearch, faGem, faQuestionCircle, faShieldAlt, faRecordVinyl
} from '@fortawesome/free-solid-svg-icons';

import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import GettingStarted from './components/GettingStarted/GettingStarted';
import Commands from './components/Commands/Commands';
import Premium from './components/Premium/Premium';
import SingleCommand from './components/SingleCommand/SingleCommand';
import Footer from './components/Footer/Footer';

import apiServices from './services/apiServices';

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

    constructor() {
        super();
        this.state = {
            commands: null
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getCommands();
    }

    componentWillUnmount = () => this._isMounted = false;

    getCommands() {
        if(!this._isMounted) return setTimeout(() => this.getCommands(), 2000);
        apiServices.getCommands()
        .then(commands => this.setState({ dataReceived: true, commands: commands.data.data.filter(el => el.category !== "Dev") }))
        .catch(err => console.error(err));
    }

    routeCommands() {
        let Commands = this.state.commands.map((el, idx) => {
            return <Route key={idx} exact path={`/commands/${el.name}`} component={() => (<SingleCommand command={el} />)}/>
        });

        return Commands;
    };

    render() {
        return(
            <div id="App">
            <Router>
                <div id="App-Contents">
                    <NavBar />
                    <Route exact path="/" component={HomePage} />
                    {this.state.dataReceived ? <Route exact path="/commands" component={() => (<Commands commands={this.state.commands} />)} /> : ''}
                    {this.state.dataReceived ? <Route exact path="/gettingstarted" component={GettingStarted} /> : ''}
                    <Route exact path="/premium" component={Premium} />
                    {this.state.dataReceived ? this.routeCommands() : ''}
                    <Footer />
                </div>
            </Router>
            </div>
        );
    }
};

export default App;
