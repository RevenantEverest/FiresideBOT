import React, { Component } from 'react';
import './Dashboard.css';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
  }

  componentDidMount() {
    document.querySelector('.NavBar').style.display = "inline-block";
  }

  render() {
    return(
      <div className="Dashboard">
      </div>
    );
  }
};

export default Dashboard;
