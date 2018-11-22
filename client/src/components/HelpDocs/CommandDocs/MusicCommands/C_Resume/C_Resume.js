import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './C_Resume.css';

//Image Imports
import ResumeImage from '../../../../../res/images/HelpDocsImages/Resume.png';

class C_Resume extends Component {

  render() {
    return(
      <div id="C_Resume">
        <div className="C_Resume-Contents">
          <Link to="/help/commands/resume"><h3 className="C_Resume-Header">Resume</h3></Link>
          <br />
          <br />
          <p className="C_Resume-Desc">Resumes the current song.</p>
          <img id="Resume-Image" className="CommandImage" src={ResumeImage} alt="" />
        </div>
      </div>
    );
  }
};

export default C_Resume;
