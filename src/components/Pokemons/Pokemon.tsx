import React from "react";
import { padStart } from "lodash";
import { Link } from "react-router-dom";

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

export const Pokemon: React.FC<PokemonInfoType> = ({
  id,
  name,
  image,
  types,
}) => {
  return (
    <div className="box-pokemons__item">
      <div className="box-pokemons__item-inner inner-pokemon">
        <Link to={`/pokemon/${id}`}>
          <div className="inner-pokemon__top">
            <div className="inner-pokemon__name">{name}</div>
            <div className="inner-pokemon__id">
              #{padStart(id.toString(), 4, "0")}
            </div>
          </div>
          <div className="inner-pokemon__image">
            <img src={image} alt="pokemon" />
          </div>
        </Link>
        <ul className="inner-pokemon__types">
          {types.length &&
            types.map((t: PokemonTypesType) => <li>{t.type.name}</li>)}
        </ul>
      </div>
    </div>
  );
};
