import React, { Component } from 'react';
import './CurrencySettings.css';

//Services Imports
import currencyServices from '../../../../services/currencyServices';

class CurrencySettings extends Component {

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
      <div>
        <form id="CurrencySettingsForm" onSubmit={this.handleSubmit}>
          <label className="CurrencySettings-CurrencyName-Label">Currency Name </label>
          <label className="CurrencySettings-CurrencyIncreaseRate-Label">Increase Rate </label>
          <br />
          <input className="CurrencySettings-CurrencyName" type="text" name="currency_name" placeholder={`${this.state.settings.currency_name}`} onChange={this.handleChange} />
          <input className="CurrencySettings-CurrencyIncreaseRate" type="text" name="currency_increase_rate" onChange={this.handleChange} value={`${ this.state.settings.currency_increase_rate}`} />
          <input className="CurrencySettings-Submit" type="submit" value="Update" />
        </form>
        <p className="CurrencySettings-CurrencyName-Desc">A name for your servers currency (ie. Souls) </p>
        <p className="CurrencySettings-CurrencyIncreaseRate-Desc">Currency increase per message sent </p>
      </div>
    );
  }

  render() {
    return(
      <div id="CurrencySettings">
        <div className="CurrencySettings-Contents">
          <h4 className="CurrencySettings-Header">Currency Settings:</h4>
          {this.state.settingsRecieved ? this.renderSettings() : <div className="loading" id="LoadingManageGuildCurrency" />}
        </div>
      </div>
    );
  }
};

export default CurrencySettings;
