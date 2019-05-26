import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Resume.css';

//Componet Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';

//Image Imports
import ResumeImage from '../../../../res/images/HelpDocsImages/Resume.png';

class Resume extends Component {

  render() {
    return(
      <div id="Resume">
        <div className="Resume-Contents">
          <Link to="/commands/resume"><h3 className="Resume-Header">Resume</h3></Link>
          <br />
          <br />
          <p className="Resume-Desc">Resumes the current song.</p>
          <img id="Resume-Image" className="CommandImage" src={ResumeImage} alt="" />
          <br />
          <br />
          <br />
          <AliasTable tableData={[{alias: 'unpause'}]} />
        </div>
      </div>
    );
  }
};

export default Resume;
