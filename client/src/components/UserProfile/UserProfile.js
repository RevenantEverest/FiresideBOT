import React, { Component } from 'react';
import './UserProfile.css';

//Services Imports
import userServices from '../../services/userServices';

//Component Imports
import UserSettings from './UserSettings/UserSettings';

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    userServices.getUserById(this.props.userData.user_id)
      .then(user => {
        this.setState({ userData: user.data.data, dataRecieved: true });
      })
      .catch(err => console.log(err));
  }

  renderUser() {
    return(
      <div className="UserInfo">
        <h1 className="UserName">{this.state.userData.username}</h1>
        <UserSettings userData={this.state.userData} />
      </div>
    );
  }

  render() {
    return(
      <div className="UserProfile">
        {/* {this.state.dataRecieved ? this.renderUser() : ''} */}
      </div>
    );
  }
};

export default UserProfile;
