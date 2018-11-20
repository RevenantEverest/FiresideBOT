import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './CurrencySystem.css';

//Services Imports
import discordServices from '../../services/discordServices';

class CurrencySystem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getGuilds();
  }

  getGuilds() {
    discordServices.getUserGuilds(window.localStorage.access_token)
      .then(guilds => {
        let tempArr = [];
        for(let i = 0; i < guilds.data.length; i++) {
          if(guilds.data[i].permissions >= 2146958591) tempArr.push(guilds.data[i]);
        }
        this.setState({ guildData: guilds.data, adminGuildData: tempArr, guildDataRecieved: true });
      })
      .catch(err => console.log(err));
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({
      manageGuildCurrencyId: value,
      manageGuildRedirect: true
    });
  }

  renderChooseGuildForm() {
    let AdminGuilds = this.state.adminGuildData.map((el, idx) => {
      return(
        <option name="guild_id" value={el.id}>{el.name}</option>
      );
    });

    return(
        <div className="CurrencySystem-DiscordGuilds">
          <h4 className="CurrencySystem-DiscordGuilds-Header">Manage A Discord Server: </h4>
          <div className="CurrencySystem-Select-Container">
            <select className="CurrencySystem-GuildSelect" onChange={this.handleChange}>
              <option>Select A Server: </option>
              {AdminGuilds}
            </select>
          </div>
        </div>
    );
  }

  render() {
    return(
      <div id="CurrencySystem">
        <div className="CurrencySystem-Contents">
          <div className="CurrencySystem-Header">
            <h1 className="CurrencySystem-Header-Text">Currency Manager</h1>
            <Link to="/dashboard"><p className="CurrencySystem-Header-SubText">HOME / </p></Link>
            <p className="CurrencySystem-Header-SubText-Main">Currency</p>
          </div>
          {this.state.guildDataRecieved ? this.renderChooseGuildForm() : <div className="loading" id="LoadingCurrencySystem" />}
          {this.state.manageGuildRedirect ? <Redirect to={`/currency/manage/${this.state.manageGuildCurrencyId}`} /> : ''}
          {!this.state.userData ? <Redirect to="/" /> : ''}
        </div>
      </div>
    );
  }
};

export default CurrencySystem;
