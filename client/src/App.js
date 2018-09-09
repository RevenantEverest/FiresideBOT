import React, { Component } from 'react';
import './App.css';

//Component Imports
import HomePage from './components/HomePage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomePage />
      </div>
    );
  }
}

export default App;
