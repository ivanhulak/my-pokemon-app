import React from "react";
import { PokemonInfoType, PokemonStatItem, PokemonTypesType } from "../@types/pokemons-types";
import no_pokemon from "../assets/img/no-pokemon.png";
import { findColor } from "../utils/functions/findColor";
import { allStats } from "../utils/allStats";
import { allTypes } from "../utils/allTypes";
import { PokeballLoader } from "./PokeballLoader";
import { PokemonID } from "./PokemonID";

export const PokemonCard: React.FC<PokemonInfoType> = ({
  id,
  name,
  types,
  stats,
  image,
  image_reserve,
}) => {

  return (
    <div className="singlePokemon__block block-single">
      <div className="block-single__top">
        <div className="block-single__info">
          <PokemonID id={id} className="block-single__id" />
          <div className="block-single__name">{name}</div>
        </div>
        <div className="block-single__types">
          <ul className="block-single__types-list">
            {!types ? <PokeballLoader /> :
              types.map((t: PokemonTypesType) => (
                <li
                  key={t.type.name}
                  style={{ background: `${findColor(allTypes, t.type.name, "color")}` }}
                >
                  {t.type.name}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className="block-single__main">
        <div className="block-single__stats stats-block">
          <div className="stats-block__inner">
            {!stats ? <PokeballLoader /> :
              stats.map((item: PokemonStatItem) => (
                <div key={item.stat.url} className="stats-block__stat">
                  <div className="stats-block__property">{item.stat.name}</div>
                  <div className="stats-block__scale">
                    <div
                      className="stats-block__scale-max"
                      style={{
                        background: `${findColor(
                          allStats,
                          item.stat.name,
                          "light_color"
                        )}`,
                      }}
                    ></div>
                    <div
                      className="stats-block__scale-indicator"
                      style={{
                        width: `${item.base_stat < 100 ? item.base_stat : 100}%`,
                        background: `${findColor(
                          allStats,
                          item.stat.name,
                          "color"
                        )}`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="block-single__image">
          <img src={image || image_reserve || no_pokemon} alt="pokemon" />
        </div>
      </div>
    </div>
  );
};
