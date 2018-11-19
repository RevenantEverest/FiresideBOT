import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomePage.css';

//Image Imports
import Logo from '../../res/images/Logo.png'

//services Imports
import discordServices from '../../services/discordServices';
import guildServices from '../../services/GuildServices/guildServices';

import key from '../../key.js';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      isLoggedIn: false,
      apiData: null,
      dataRecieved: false
    }
  }

  componentDidMount() {
    document.querySelector('.NavBar').style.display = "none";
    this.getToken();
    this.getGuilds();
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

  getGuilds() {
    guildServices.getGuilds()
      .then(guilds => {
        this.setState({ guilds: guilds.data.data.length, guildDataRecieved: true });
      })
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
    if(window.localStorage.access_token) this.setState({ isLoggedIn: true });
    else window.location.href = `https://discordapp.com/api/oauth2/authorize?client_id=${key.CLIENT_ID}&response_type=code&scope=guilds%20identify%20connections%20email%20messages.read&state=helloWorld&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F`
  }

  render() {
    return(
      <div className="HomePage">
        <div className="HomePage-Contents">
          <div className="HomePage-Box1">
            <div className="HomePage-Box1-Vignette">
              <div className="HomePage-Box1-Contents">
                <img className="Logo" src={Logo} alt=""/>
                <h1 className="Text-Logo">FiresideBOT</h1>
                <button className="Discord-Login" onClick={(e) => this.handleDiscordLogin()}>
                <FontAwesomeIcon className="HomePage-DiscordIcon" icon={['fab', 'discord']} />
                  Login With Discord
                </button>
                {this.state.guildDataRecieved ? <h2 className="HomePage-ServerList">Operating In {this.state.guilds} Discord Servers!</h2>: ''}
                {this.state.dataRecieved ? <Redirect to="/dashboard" /> : ''}
                {this.state.isLoggedIn ? <Redirect to="/dashboard" /> : ''}
              </div>
            </div>
          </div>

          <div className="HomePage-Box2">
            <h1 className="HomePage-Features-Header-Text">Features</h1>
            <div className="HomePage-Features">
              <div className="HomePage-Music">
                <FontAwesomeIcon className="HomePage-MusicIcon" icon="music" />
                <p>Curabitur nulla nulla, scelerisque sit amet facilisis at, vestibulum sed elit. Etiam dapibus purus quis placerat placerat. Vestibulum eget massa in felis semper sagittis. Duis congue nulla condimentum tempus molestie. Vivamus risus augue, tempus at ullamcorper id, varius ullamcorper ante. Donec finibus nec lectus eu tincidunt. Sed pellentesque neque et lacinia aliquet.</p>
              </div>
              <div className="HomePage-Ranks">
                <FontAwesomeIcon className="HomePage-RankIcon" icon="crown" />
                <p>Curabitur nulla nulla, scelerisque sit amet facilisis at, vestibulum sed elit. Etiam dapibus purus quis placerat placerat. Vestibulum eget massa in felis semper sagittis. Duis congue nulla condimentum tempus molestie. Vivamus risus augue, tempus at ullamcorper id, varius ullamcorper ante. Donec finibus nec lectus eu tincidunt. Sed pellentesque neque et lacinia aliquet.</p>
              </div>
              <div className="HomePage-Analytics">
                <FontAwesomeIcon className="HomePage-AnalyticsIcon" icon="chart-line" />
                <p>Curabitur nulla nulla, scelerisque sit amet facilisis at, vestibulum sed elit. Etiam dapibus purus quis placerat placerat. Vestibulum eget massa in felis semper sagittis. Duis congue nulla condimentum tempus molestie. Vivamus risus augue, tempus at ullamcorper id, varius ullamcorper ante. Donec finibus nec lectus eu tincidunt. Sed pellentesque neque et lacinia aliquet.</p>
              </div>
              <div className="HomePage-Moderation">
                <FontAwesomeIcon className="HomePage-ModerationIcon" icon="bolt" />
                <p>Curabitur nulla nulla, scelerisque sit amet facilisis at, vestibulum sed elit. Etiam dapibus purus quis placerat placerat. Vestibulum eget massa in felis semper sagittis. Duis congue nulla condimentum tempus molestie. Vivamus risus augue, tempus at ullamcorper id, varius ullamcorper ante. Donec finibus nec lectus eu tincidunt. Sed pellentesque neque et lacinia aliquet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default HomePage;
