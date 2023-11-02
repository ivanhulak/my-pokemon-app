import React from "react";
import { useSelector } from "react-redux";
import { StatusEnum } from "../../@types/enums/StatusEnum";
import { PokemonInfoType } from "../../@types/pokemons/common";
import { Error } from "../../pages/Error";
import { NoPokemonsFound } from "../NoPokemonsFound";
import { LoadingPokemon } from "./LoadingPokemon";
import { Pokemon } from "./Pokemon";

const SKELETONS_COUNT = 10

type PokemonsBlockProps = {
  fetchDataFunc: () => void;
}

export const PokemonsBlock: React.FC<PokemonsBlockProps> = ({ fetchDataFunc }) => {
  const { status, pokemonsInfoList, errorMessage } = useSelector((state: any) => state.pokemons);

  const skeleton = Array(SKELETONS_COUNT).fill(null).map((_, idx) => <LoadingPokemon key={idx} />);
  const pokemonItems = pokemonsInfoList.map((pkmn: PokemonInfoType) => (
    <Pokemon key={pkmn.url} {...pkmn} />
  ));

  return (
    <div className="pokemons">
      {status === StatusEnum.ERROR ? (
        <Error error={errorMessage} callback={fetchDataFunc} />
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
