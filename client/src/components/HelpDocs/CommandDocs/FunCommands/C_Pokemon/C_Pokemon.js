import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./C_Pokemon.css";

//Image Imports
import PokemonImage from '../../../../../res/images/HelpDocsImages/Pokemon.png';
import PokemonImage_Flag from '../../../../../res/images/HelpDocsImages/PokemonFlag.png';

class C_Pokemon extends Component {

  render() {
    return(
      <div id="C_Pokemon">
        <div className="C_Pokemon-Contents">
          <Link to="/help/commands/pokemon"><h3 className="C_Pokemon-Header">Pokemon</h3></Link>
          <h4 className="C_Pokemon-SubHeader">[param]</h4>
          <p className="C_Pokemon-SubHeader-Param">Pokemon takes in an optional parameter of a Pokemon's name or ID</p>
          <br />
          <br />
          <p className="C_Pokemon-Desc">Displays a random Pokemon or a specific Pokemon depending on the parameter. Using the </p>
          <p className="C_Pokemon-Desc C_Pokemon-Desc-Flag">-i</p>
          <p className="C_Pokemon-Desc"> flag, you can get more information about your Pokemon. The flag can be used with or without a Pokemon name or ID</p>
          <br />
          <br />
          <img id="Pokemon-ImageA" className="CommandImage" src={PokemonImage} alt="" />
          <br />
          <img id="Pokemon-ImageB" className="CommandImage" src={PokemonImage_Flag} alt="" />
          <br />
          <table className="C_Pokemon-Table">
            <tbody className="C_Pokemon-Tbody">
              <tr className="C_Pokemon-TR-Header">
                <th className="C_Pokemon-TH-Flag">Flag</th>
                <th className="C_Pokemon-TH-Description">Description</th>
              </tr>
              <tr className="C_Pokemon-TR">
                <td className="C_Pokemon-TD">-i</td>
                <td className="C_Pokemon-TD">Displays more information</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default C_Pokemon;
