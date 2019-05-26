import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Pokemon.css";

//Component Imports
import FlagsTable from '../../Flags/FalgsTable/FlagsTable';

//Image Imports
import PokemonImage from '../../../../res/images/HelpDocsImages/Pokemon.png';
import PokemonImage_Flag from '../../../../res/images/HelpDocsImages/PokemonFlag.png';


class Pokemon extends Component {

  render() {
    return(
      <div id="Pokemon">
        <div className="Pokemon-Contents">
          <Link to="/commands/pokemon"><h3 className="Pokemon-Header">Pokemon</h3></Link>
          <h4 className="Pokemon-SubHeader">[param]</h4>
          <p className="Pokemon-SubHeader-Param">Pokemon takes in an optional parameter of a Pokemon's name or ID</p>
          <br />
          <br />
          <p className="Pokemon-Desc">Displays a random Pokemon or a specific Pokemon depending on the parameter. Using the </p>
          <p className="Pokemon-Desc Pokemon-Desc-Flag">-i</p>
          <p className="Pokemon-Desc"> flag, you can get more information about your Pokemon. The flag can be used with or without a Pokemon name or ID</p>
          <br />
          <br />
          <img id="Pokemon-ImageA" className="CommandImage" src={PokemonImage} alt="" />
          <br />
          <img id="Pokemon-ImageB" className="CommandImage" src={PokemonImage_Flag} alt="" />
          <br />
          <FlagsTable tableData={[{flag: '-i', desc: 'Displays more info about the Pokemon'}]} />
        </div>
      </div>
    );
  }
};

export default Pokemon;
