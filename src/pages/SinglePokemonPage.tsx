import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PokemonInfoType } from "../@types/pokemons/common";
import { PokemonBreeding } from "../components/SinglePokemon/PokemonBreeding";
import { PokemonCard } from "../components/SinglePokemon/PokemonCard";
import { PokemonMoves } from "../components/SinglePokemon/PokemonMoves";

export const SinglePokemonPage: React.FC = () => {
  const { pokemonsInfoList } = useSelector((state: any) => state.pokemons);
  const params = useParams();

  const pokemonData = pokemonsInfoList.filter(
    (item: PokemonInfoType) => item.id === Number(params.id)
  );
  

  return (
    <div className="singlePokemon">
      <div className="container">
        <div className="singlePokemon__body">
          <PokemonCard {...pokemonData[0]}/>
          <PokemonBreeding weight={pokemonData[0].weight} height={pokemonData[0].height}/>
          <PokemonMoves />
        </div>
      </div>
    </div>
  );
};
