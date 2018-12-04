import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Dashboard.css';

//Services Imports
import discordServices from '../../services/discordServices';
import guildServices from '../../services/GuildServices/guildServices';

// const redirect = 'http%3A%2F%2Fwww.firesidebot.com%2F';
const redirect = 'http%3A%2F%2Flocalhost%3A3000%2F';
const CLIENT_ID = '441338104545017878';

class Dashboard extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      chosenGuild: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.querySelector('.NavBar').style.display = "inline-block";
    this._isMounted = true;
    this.getUserGuilds();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getUserGuilds() {
    if(window.location.search) {
      this.setState({
        manageGuildId: window.location.search.split("&")[1].split("guild_id=")[1],
        manageGuildRedirect: true
      })
    }
    discordServices.getUserGuilds(this.state.userData.discord_id)
      .then(results => {
         let tempArr = [];
        for(let i = 0; i < results.data.data.length; i++) {
           if(results.data.data[i].permissions >= 2146958591) tempArr.push(results.data.data[i]);
        }
        if(this._isMounted) this.setState({ discordGuilds: tempArr, chosenGuild: tempArr[0], dataReceived: true });
      })
      .catch(err => console.log(err));
  }

  handleChange(e) {
    let value = e.target.value;
    guildServices.checkForGuild(value)
      .then(results => {
        if(results.data.data) {
          this.setState({
            manageGuildId: value,
            manageGuildRedirect: true
          })
        }else if(!results.data.data) {
          for(let i = 0; i < this.state.discordGuilds.length; i++) {
            if(value === this.state.discordGuilds[i].id) return this.setState({ chosenGuild: this.state.discordGuilds[i] }, () => {
              console.log(this.state.chosenGuild);
              window.location.replace(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&guild_id=${this.state.chosenGuild.id}&permissions=2146958583&redirect_uri=${redirect}%2Fdashboard&scope=bot`);
            })
          }
        }
      })
      .catch(err => console.log(err));

  }


  renderGuilds() {
    let Guilds = this.state.discordGuilds.map((el, idx) => {
      return(
        <option key={idx} value={el.id}>{el.name}</option>
      );
    });
    return(
      <div className="Dashboard-DiscordGuilds">
        <h4 className="Dashboard-DiscordGuilds-Header">Manage Discord Server: </h4>
        <div className="Dashboard-Select-Container">
          <select className="Dashboard-GuildSelect" onChange={this.handleChange}>
            <option>Select A Server: </option>
            {Guilds}
          </select>
        </div>
      </div>
    );
  }

  render() {
    return(
      <div className="Dashboard">
        <div className="Dashboard-Contents">
          <div className="Dashboard-Header">
            <h1 className="Dashboard-Header-Text">Dashboard</h1>
            <p className="Dashboard-Header-SubText">HOME / </p>
            <p className="Dashboard-Header-SubText-Main">Dashboard</p>
          </div>
          {this.state.dataReceived ? this.renderGuilds() : <div className="loading" id="LoadingDashboard" />}
          {this.state.manageGuildRedirect ? <Redirect to={`/dashboard/server/${this.state.manageGuildId}`}/> : ''}
          {!this.state.userData ? <Redirect to="/" /> : ''}
        </div>
      </div>
    );
  }
};

export default Dashboard;
