import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Weather.css';

//Component Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';

//Image Imports
import WeatherImage from '../../../../res/images/HelpDocsImages/Weather.png';

class Weather extends Component {

    _BracketA = '<';
    _BracketB = '>';

    render() {
        return(
            <div id="Weather">
                <div className="Weather-Contents">
                    <Link to="/commands/Weather"><h3 className="Weather-Header">Weather</h3></Link>
                    <h4 className="Weather-SubHeader">{this._BracketA}param{this._BracketB}</h4>
                    <p className="Weather-Subheader-Param">City Name</p>
                    <br />
                    <br />
                    <p className="Weather-Desc">Displays relevant Weather info for a given City</p>
                    <img className="CommandImage" src={WeatherImage} alt="" />
                    <br />
                    <br />
                    <br />
                    <AliasTable tableData={[{alias: 'w'}]} />
                </div>
            </div>
        );
    }
};

export default Weather;