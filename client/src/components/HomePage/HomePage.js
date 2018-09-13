import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './HomePage.css';

//services Imports

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      apiData: null,
      apiDataRecieved: false
    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <div className="HomePage">
        <div className="Logo" />
        <h1 className="Text-Logo">Fireside BOT</h1>
        {/* <button className="HomePage-Playlists" onClick={(e) => this.setState({ playlistRedirect: true })}>Go To Playlists</button>
        {this.state.playlistRedirect ? <Redirect to="/playlists" /> : ''} */}
      </div>
    );
  }
};

export default HomePage;
