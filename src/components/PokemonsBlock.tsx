import React from "react";
import { StatusEnum } from "../@types/enums/StatusEnum";
import { PokemonInfoType } from "../@types/pokemons-types";
import { ErrorPage } from "../pages/ErrorPage";
import { selectPokemons } from "../store/slices/pokemons";
import { useAppSelector } from "../store/store";
import { NoPokemonsFound } from "./NoPokemonsFound";
import { LoadingPokemon } from "./LoadingPokemon";
import { Pokemon } from "./Pokemon";

const SKELETONS_COUNT = 10

type PokemonsBlockProps = {
  fetchDataFunc: () => void;
}

export const PokemonsBlock: React.FC<PokemonsBlockProps> = ({ fetchDataFunc }) => {

  const { status, pokemonsInfoList, errorMessage } = useAppSelector(selectPokemons);

  const skeleton = Array(SKELETONS_COUNT).fill(null)
    .map((_, idx) => <LoadingPokemon key={idx} />);
  const pokemonItems = pokemonsInfoList.map((pkmn: PokemonInfoType) => (
    <Pokemon key={pkmn.url} {...pkmn} />
  ));

  return (
    <div className="pokemons">
      {status === StatusEnum.ERROR ? (
        <ErrorPage error={errorMessage} callback={fetchDataFunc} />
      ) : (
        <div className="container">
          {status === StatusEnum.SUCCESS 
          && !pokemonItems.length 
          && <NoPokemonsFound callback={fetchDataFunc}/>}
          <div className="pokemons__box box-pokemons">
            {status === StatusEnum.LOADING ? skeleton : pokemonItems}
          </div>
        </div>
      )}
    </div>
  );
};
