import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faClock, faVolumeUp, faVolumeDown, faVolumeOff, faMusic, faTachometerAlt,
         faMagic, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import './App.css';

//Services Imports
import loginServices from './services/loginServices';

//Component Imports
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import Dashboard from './components/Dashboard/Dashboard';
import ManageServer from './components/ManageServer/ManageServer';
import Playlists from './components/Playlists/Playlists';
import SinglePlaylist from './components/Playlists/SinglePlaylist/SinglePlaylist';
import AutoDJ from './components/AutoDJ/AutoDJ';
import DefaultCommands from './components/Commands/DefaultCommands/DefaultCommands';
import CustomCommands from './components/Commands/CustomCommands/CustomCommands';

library.add(faLink, faClock, faVolumeUp, faVolumeDown, faVolumeOff, faMusic, faTachometerAlt, faMagic);
library.add(faArrowCircleLeft);

class App extends Component {

  constructor() {
    super();
    this.state = {
      userData: null
    }
    this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
    if(window.localStorage.access_token) {
      loginServices.getUserData(window.localStorage.access_token)
        .then(results => this.setState({ userData: results.data.data }))
        .catch(err => console.log(err));
    }
  }

  getUserData(user) { this.setState({ userData: user }); }

  render() {
    return (
      <div className="App">
        <Router className="App">
          <div className="App">
            <NavBar userData={this.state.userData} />
            <div className="test">
              <Route exact path="/" component={ () => (<HomePage getUserData={this.getUserData}/>) } />
              {this.state.userData != null ? <Route exact path="/dashboard" component={() => (<Dashboard userData={this.state.userData}/>) } /> : ''}
              {this.state.userData != null ? <Route path="/dashboard/server/:serverId" component={() => <ManageServer userData={this.state.userData}/>} /> : ''}
              {this.state.userData != null ? <Route path="/commands/default" component={() => (<DefaultCommands userData={this.state.userData}/>) } /> : ''}
              {this.state.userData != null ? <Route path="/commands/custom" component={() => (<CustomCommands userData={this.state.userData}/>) } /> : ''}
              {this.state.userData != null ? <Route exact path="/playlists" component={() => (<Playlists userData={this.state.userData}/>) } /> : ''}
              {this.state.userData != null ? <Route path="/playlists/:playlist_name" component={SinglePlaylist} /> : ''}
              {this.state.userData != null ? <Route path="/autodj" component={ () => (<AutoDJ userData={this.state.userData}/>) } /> : ''}
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
