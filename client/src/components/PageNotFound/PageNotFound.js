import React, { Component } from 'react';
import './PageNotFound.css';

class PageNotFound extends Component {

  componentDidMount() { document.querySelector('.NavBar').style.display = "none"; }

  render() {
    return(
      <div id="PageNotFound">
        <div className="PageNotFound-Contents">
          <h1 className="PageNotFound-Text">404 Page Not Found</h1>
        </div>
      </div>
    );
  }
};

export default PageNotFound;
