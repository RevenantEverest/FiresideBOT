import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Regulars.css';

//Image Imports
import NTSH from '../../res/images/NTSH.gif';

//Services Imports
import regularsServices from '../../services/regularsServices';

//Component Imports
import AddRegular from './AddRegular/AddRegular';

class Regulars extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
    this.renderRegulars = this.renderRegulars.bind(this);
  }

  componentDidMount() {
    this.getRegulars();
  }

  getRegulars() {
    if(this.state.userData.twitch_username === 'not connected') {
      this.renderTwitchNotConnected();
      return;
    }
    regularsServices.getRegularsByChannel(this.state.userData.twitch_username.split("#")[1])
      .then(regulars => {
        this.setState({ regulars: regulars.data.data, dataRecieved: true });
      })
      .catch(err => console.log(err));
  }

  renderTwitchNotConnected() {
    return(
      <div>
        <h4>No Twitch Account Connected</h4>
      </div>
    );
  }

  renderRegulars() {
    let counter = 0;
    let Regulars = this.state.regulars.map((el, idx) => {
      counter++;
      return(
        <tr className="Regulars-TableRow" key={idx}>
          <td className="Regulars-TD-Counter">{counter}</td>
          <td className="Regulars-TD">{el.regular_username}</td>
          <td className="Regulars-TD"></td>
        </tr>
      );
    });

    return(
      <div className="Regulars-Table">
        <tbody className="Regulars-Tbody">
          <table className="Regulars-Table">
            <tr className="Regulars-TableRow">
              <th className="Regulars-TH-Counter">#</th>
              <th className="Regulars-TH">Username</th>
              <th className="Regulars-TH">Actions</th>
            </tr>
            {Regulars}
          </table>
        </tbody>
      </div>
    );
  }

  render() {
    return(
      <div id="Regulars">
        <div className="Regulars-Contents">
          <div className="Regulars-Header">
            <h1 className="Regulars-Header-Text">Regulars</h1>
            <p className="Regulars-Header-SubText">HOME / </p>
            <p className="Regulars-Header-SubText-Main"> Regulars</p>
          </div>
          {this.state.dataRecieved ? this.renderRegulars() : ''}
          {this.state.userData.twitch_username === 'not connected' ? '' : <AddRegular userData={this.state.userData} renderRegulars={this.renderRegulars} />}
          <h3>UNDER CONSTRUCTION:</h3>
          <p>Nothing to see here :)</p>
          <img className="NTSH" src={NTSH} alt="" />
        </div>
        {!this.state.userData ? <Redirect to="/" /> : ''}
      </div>
    );
  }
};

export default Regulars;
