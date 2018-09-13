import React, { Component } from 'react';
import './UserSettings.css';

//Services Imports
import userServices from '../../../services/userServices';

class UserSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getSettings();
  }

  getSettings() {
    userServices.getUserSettings(this.props.userData.user_id)
      .then(settings => {
        this.setState({ settings: settings.data.data, dataRecieved: true });
      })
      .catch(err => console.log(err));
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let submitData = {
      user_id: this.state.userData.user_id,
      prefix: this.state.prefix
    }
    userServices.updateUserSettings(submitData)
      .then(results => { this.getSettings(); document.querySelector("#PrefixForm").reset(); })
      .catch(err => console.log(err));
  }

  renderSettings() {
    return(
      <div>
        {/* {Settings} */}
        <div>
          <form id="PrefixForm" onSubmit={this.handleSubmit}>
            <input type="text" name="prefix" onChange={this.handleChange} placeholder={this.state.settings.prefix} />
          </form>
        </div>
      </div>
    );
  }

  render() {
    return(
      <div className="UserSettings">
        {this.state.dataRecieved ? this.renderSettings() : <div className="loading" id="UserSettings" />}
      </div>
    );
  }
};

export default UserSettings;
