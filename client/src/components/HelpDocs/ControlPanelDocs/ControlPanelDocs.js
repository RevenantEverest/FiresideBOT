import React, { Component } from 'react';
import './ControlPanelDocs';

class ControlPanelDocs extends Component {

  componentDidMount() {
    document.querySelector('.NavBar').style.display = "none";
  }

  render() {
    return(
      <div id="ControlPanelDocs">
        <div className="ControlPanelDocs-Contents">
          <h1>Control Panel</h1>
        </div>
      </div>
    );
  }
};

export default ControlPanelDocs;
