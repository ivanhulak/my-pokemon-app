import React from "react";
import { Link } from "react-router-dom";
import no_pokemon from '../../assets/img/no-pokemon.png';
import { PokemonID } from "../PokemonID";
import { findColor } from "../../utils/findColor";
import { PokemonInfoType, PokemonTypesType } from "../../@types/pokemons/common";
import { allTypes } from "../../utils/some_data/allTypes";

export const Pokemon: React.FC<PokemonInfoType> = ({
  id,
  name,
  image,
  image_reserve,
  types,
}) => {
  return (
    <div className="box-pokemons__item">
      <div className="box-pokemons__item-inner inner-pokemon">
        <Link to={`/pokemon/${id}`}>
          <div className="inner-pokemon__top">
            <div className="inner-pokemon__name">{name}</div>
            <PokemonID id={id} className="inner-pokemon__id"/>
          </div>
          <div className="inner-pokemon__image">
            <img src={image || image_reserve || no_pokemon} alt="pokemon" />
          </div>
        </Link>
        <ul className="inner-pokemon__types">
          {types.length &&
            types.map((t: PokemonTypesType) => (
            <li 
              key={t.type.name} 
              style={{'background': `${findColor(allTypes, t.type.name, 'color')}`}}
            >
              {t.type.name}
            </li>))}
        </ul>
      </div>
    </div>
  );
};
