import React, { Component } from 'react';
import './Dashboard.css';

//Services Imports
import discordServices from '../../../services/discordServices';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
  }

  componentDidMount() {
    document.querySelector('.NavBar').style.display = "inline-block";
    console.log(window.localStorage);
    discordServices.getUserGuilds(window.localStorage.access_token)
      .then(results => {
        let tempArr = [];
        for(let i = 0; i < results.data.length; i++) {
          if(results.data[i].permissions >= 2146958591) tempArr.push(results.data[i]);
        }
        this.setState({ discordGuilds: tempArr, dataReceived: true });
      })
      .catch(err => console.log(err));
  }

  renderGuilds() {
    let Guilds = this.state.discordGuilds.map((el, idx) => {
      return(
        <div className="Guild" key={idx}>
          <h1>{el.name}</h1>
        </div>
      );
    });
    return(
      <div className="Dashboard-DiscordGuilds">
        {Guilds}
      </div>
    );
  }

  render() {
    return(
      <div className="Dashboard">
        <div className="Dashboard-Contents">
          {this.state.dataReceived ? this.renderGuilds() : <div className="loading" id="Dashboard" />}
        </div>
      </div>
    );
  }
};

export default Dashboard;
