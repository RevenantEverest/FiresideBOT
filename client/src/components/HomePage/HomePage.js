import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './HomePage.css';

//services Imports
import discordServices from '../../services/discordServices';

import key from '../../key.js';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      apiData: null,
      dataRecieved: false
    }
  }

  componentDidMount() {
    document.querySelector('.NavBar').style.display = "none";
    if(window.location.search) {
      let code = window.location.search.split("code=")[1];
      discordServices.getToken(code)
        .then(results => {
          window.localStorage.setItem('access_token', results.data.data.access_token);
          this.setState({ dataRecieved: true });
        }).catch(err => console.log(err));
    }
  }

  render() {
    return(
      <div className="HomePage">
        <div className="Logo" />
        <h1 className="Text-Logo">Fireside BOT</h1>
        <a href={`https://discordapp.com/api/oauth2/authorize?client_id=${key.CLIENT_ID}&response_type=code&scope=guilds%20identify%20connections%20email%20messages.read&state=helloWorld&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F`}>Login With Discord</a>
        {this.state.dataRecieved ? <Redirect to="/user/dashboard" /> : ''}
      </div>
    );
  }
};

export default HomePage;
