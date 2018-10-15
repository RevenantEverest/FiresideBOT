import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './HomePage.css';

//services Imports
import discordServices from '../../services/discordServices';
import loginServices from '../../services/loginServices';

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
    this.getToken();
  }

  getToken() {
    if(window.location.search) {
      let code = window.location.search.split("code=")[1];
      discordServices.getToken(code)
        .then(results => {
          window.localStorage.setItem('access_token', results.data.data.access_token);
          this.setState({ dataRecieved: true }, () => this.props.getUserData(results.data.data.userData));
        }).catch(err => console.log(err));
    }
                      // else if(window.localStorage.access_token) {
                      //   loginServices.getUserData(window.localStorage.access_token)
                      //     .then(user => {
    //Revisit later   //       this.userDataPromise(user.data.data);
                      //     })
                      //     .catch(err => console.log(err));
                      // }
  }

  userDataPromise(userData) {
    return new Promise((resolve, reject) => {
      this.props.getUserData(userData);
      setTimeout(() => {
        this.setState({ dataRecieved: true });
        resolve("Success!")
      }, 2000)
    });
  }

  handleDiscordLogin() {
    window.location.href = `https://discordapp.com/api/oauth2/authorize?client_id=${key.CLIENT_ID}&response_type=code&scope=guilds%20identify%20connections%20email%20messages.read&state=helloWorld&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F`
  }

  render() {
    return(
      <div className="HomePage">
        <div className="Logo" />
        <h1 className="Text-Logo">Fireside BOT</h1>
        <button className="Discord-Login" onClick={(e) => this.handleDiscordLogin()}>Login With Discord</button>
        {this.state.dataRecieved ? <Redirect to="/dashboard" /> : ''}
      </div>
    );
  }
};

export default HomePage;
