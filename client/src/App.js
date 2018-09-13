import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

//Component Imports
import NavBar from './components/UserProfile/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import UserProfile from './components/UserProfile/UserProfile';
import Dashboard from './components/UserProfile/Dashboard/Dashboard';
import Playlists from './components/UserProfile/Playlists/Playlists';
import SinglePlaylist from './components/UserProfile/Playlists/SinglePlaylist/SinglePlaylist';
import DefaultCommands from './components/UserProfile/Commands/DefaultCommands/DefaultCommands';
import CustomCommands from './components/UserProfile/Commands/CustomCommands/CustomCommands';

class App extends Component {

  constructor() {
    super();
    this.state = {
      userData: {
        user_id: 1
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Router className="App">
          <div className="App">
            <NavBar userData={this.state.userData} />
            <div className="test">
              <Route exact path="/" component={ () => (<HomePage userData={this.state.userData}/>) } />
              <Route exact path="/user" component={ () => (<UserProfile userData={this.state.userData}/>) } />
              <Route path="/user/dashboard" component={() => (<Dashboard userData={this.state.userData}/>) } />
              <Route path="/user/commands/default" component={() => (<DefaultCommands userData={this.state.userData}/>) } />
              <Route path="/user/commands/custom" component={() => (<CustomCommands userData={this.state.userData}/>) } />
              <Route exact path="/user/playlists" component={() => (<Playlists userData={this.state.userData}/>) } />
              <Route path="/user/playlists/:playlist_name" component={SinglePlaylist} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
