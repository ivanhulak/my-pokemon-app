import React from "react";
import { padStart } from "lodash";

type PokemonStatItem = {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
};
type PokemonTypesType = {
  slot: number;
  type: { name: string; url: string };
};

export type PokemonInfoType = {
  id: number;
  url: string;
  name: string;
  types: PokemonTypesType[];
  stats: PokemonStatItem[];
  weight: number;
  image: string;
};

export const Pokemon: React.FC<PokemonInfoType> = ({ id, name, image }) => {
  return (
    <div className="box-pokemons__item">
      <div className="box-pokemons__item-inner inner-pokemon">
        <div className="inner-pokemon__top">
          <div className="inner-pokemon__name">{name}</div>
          <div className="inner-pokemon__id">#{padStart(id.toString(), 4, '0')}</div>
        </div>
        <div className="inner-pokemon__image">
            <img src={image} alt="pokemon" />
          </div>
        <ul className="inner-pokemon__types">
          <li>Grass</li>
          <li>Poison</li>
        </ul>
      </div>
    </div>
  );
};
