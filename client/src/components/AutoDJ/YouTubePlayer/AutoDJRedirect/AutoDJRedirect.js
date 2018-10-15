import React, { Component } from 'react';
import './AutoDJRedirect.css';

//Services Imports
import discordServices from '../../../../services/discordServices';
import autodjServices from '../../../../services/autodjServices';

class AutoDJRedirect extends Component {

  constructor(props) {
    super(props);
    this.state = {
        userData: this.props.userData
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getUserGuilds();
    this.getRedirectSettings();
  }

  getUserGuilds() {
    discordServices.getUserGuilds(window.localStorage.access_token)
      .then(guilds => {
        this.setState({ userGuilds: guilds.data, dataReceived: true });
      })
      .catch(err => console.log(err));
  }

  getRedirectSettings() {
    autodjServices.getRedirectSettings(this.props.userData.user_id)
      .then(results => {
        this.setState({ redirectSettings: results.data.data }, () => {
          if(results.data.data.redirect === 'f')
            this.setState({ checkboxValue: 'f' });
          else if(results.data.data.redirect === 't')
            this.setState({ checkboxValue: 't' });
        });
      })
      .catch(err => console.log(err));
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    }, () => {
      if(name === 'redirect') this.handleRedirectSubmit();
      else if(name === 'guild_id') this.handleGuildRedirectSubmit();
    });
  }

  handleCheckbox() {
    if(this.state.checkboxValue === 't')
      this.setState({ checkboxValue: 'f' });
    else if(this.state.checkboxValue === 'f')
      this.setState({ checkboxValue: 't' });
  }

  handleRedirectSubmit() {
    let data = {
      user_id: this.state.userData.user_id,
      redirect: this.state.checkboxValue
    };
    autodjServices.updateRedirectSettings(data)
      .then(results => {

      })
      .catch(err => console.log(err));
  }

  handleGuildRedirectSubmit() {
    let data = {
      user_id: this.state.userData.user_id,
      guild_id: this.state.guild_id
    }
    autodjServices.updateGuildRedirectSettings(data)
      .then(results => {

      })
      .catch(err => console.log(err));
  }

  renderForm() {
    let Guilds = this.state.userGuilds.map((el, idx) => {
      return(
        <option name="guild_id" value={`${el.id}`} key={idx}>{el.name}</option>
      );
    });

    let checkbox = document.querySelector('.checkbox');
    if(this.state.checkboxValue === 'f')
      checkbox.checked = false;
    else if(this.state.checkboxValue === 't')
      checkbox.checked = true;

    return(
      <select className="AutoDJRedirect-Select" name="guild_id" onChange={this.handleChange}>
        <option>Select a Server</option>
        {Guilds}
      </select>
    );
  }

  render() {
    return(
      <div className="AutoDJ-Redirect">
        <div>
          <label className="switch">
            <input className="checkbox" type="checkbox" name="redirect" value={`${this.state.checkboxValue}`}
              onChange={this.handleChange} onClick={(e) => this.handleCheckbox()} />
            <span className="slider round"/>
          </label>
          {this.state.dataReceived ? this.renderForm() : ''}
        </div>
      </div>
    );
  }
};

export default AutoDJRedirect;
