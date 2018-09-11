import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

//Component Imports
import HomePage from './components/HomePage/HomePage';
import Playlists from './components/Playlists/Playlists';
import SinglePlaylist from './components/Playlists/SinglePlaylist/SinglePlaylist';

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
        <Router>
          <div>
            <Route exact path="/" component={ () => (<HomePage userData={this.state.userData}/>) } />
            <Route exact path="/playlists" component={() =>
              (<Playlists userData={this.state.userData} choosePlaylist={this.choosePlaylist}/>)
            } />
            <Route path="/playlists/:playlist_name" component={SinglePlaylist} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
