import React, { Component } from 'react';
import "./C_Pokemon.css";

//Image Imports
import PokemonImage from '../../../../../res/images/HelpDocsImages/Pokemon.png';
import PokemonImage_Flag from '../../../../../res/images/HelpDocsImages/PokemonFlag.png';

class C_Pokemon extends Component {

  render() {
    return(
      <div id="C_Pokemon">
        <div className="C_Pokemon-Contents">
        <h4>Pokemon</h4>
        <img className="CommandImage" src={PokemonImage} alt="" />
        <img className="CommandImage" src={PokemonImage_Flag} alt="" />
        </div>
      </div>
    );
  }
};

export default C_Pokemon;
