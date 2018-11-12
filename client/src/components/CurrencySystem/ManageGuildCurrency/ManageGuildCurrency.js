import React, { Component } from 'react';
import './ManageGuildCurrency.css';

//Services Imports
import currencyServices from '../../../services/currencyServices';

class ManageGuildCurrency extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getCurrencySettings();
  }

  getCurrencySettings() {
    let guild_id = window.location.pathname.split("/")[3];
    currencyServices.getSettings(guild_id)
      .then(settings => {
        this.setState({ settings: settings.data.data, settingsRecieved: true });
      })
      .catch(err => console.log(err));
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    currencyServices.updateSettings({
      guild_id: this.state.settings.guild_id,
      currency_name: (this.state.currency_name ? this.state.currency_name : this.state.settings.currency_name),
      currency_increase_rate: (this.state.currency_increase_rate ? this.state.currency_increase_rate : this.state.settings.currency_increase_rate)
    })
    .then(results => {
      this.getCurrencySettings();
    })
    .catch(err => console.log(err));
  }

  renderSettings() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="currency_name" placeholder={`Currency Name: ${this.state.settings.currency_name}`} onChange={this.handleChange} />
        <input
          id="currency_increase_rate-slider"
          type="range"
          name="currency_increase_rate"
          min="0" max="500"
          onChange={this.handleChange}
        />
        <input type="text" name="currency_increase_rate" onChange={this.handleChange}
          value={`${this.state.currency_increase_rate ? this.state.currency_increase_rate : this.state.settings.currency_increase_rate}`}
        />
        <input type="submit" value="Update" />
      </form>
    );
  }

  render() {
    return(
      <div id="ManageGuildCurrency">
        <div className="ManageGuildCurrency-Contents">
          {this.state.settingsRecieved ? this.renderSettings() : <div className="loading" id="LoadingManageGuildCurrency" />}
        </div>
      </div>
    );
  }
};

export default ManageGuildCurrency;
