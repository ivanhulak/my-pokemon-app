import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { PokemonType } from "../../@types/pokemons/common";
import {
  setPokemonsInfo,
  setPokemonsCount,
  StatusEnum,
  setError
} from "../../store/slices/pokemons";
import { useAppDispatch } from "../../store/store";
import { LoadingPokemon } from "./LoadingPokemon";
import { Pokemon, PokemonInfoType } from "./Pokemon";

export type FetchPokemonsType = {
  count: number;
  results: PokemonType[];
  next: string | null;
  prev: string | null;
};

export const PokemonsBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const { offsetPage, limit } = useSelector((state: any) => state.filters);
  const { status, pokemonsInfoList } = useSelector((state: any) => state.pokemons);

  const fetchPokemonsInfo = async (url: string) => {
    const { data } = await axios.get(`${url}`)
    const {id, name, stats, weight, types } = data
    const obj: PokemonInfoType = {
      id,
      url,
      name,
      types,
      stats,
      weight,
      image: data.sprites.other.dream_world.front_default
    }
    return obj
  }

  React.useEffect(() => {
    const fetchPokemons = async () => {
      const { data } = await axios.get<FetchPokemonsType>(
        'https://pokeapi.co/api/v2/pokemon',
        {
          params: {
            offset: offsetPage,
            limit
          }
        }
      );
      dispatch(setPokemonsCount(data.count));
      const promises = data.results.map((item: PokemonType) => fetchPokemonsInfo(item.url))
      await Promise.all(promises)
        .then(info => {
          return dispatch(setPokemonsInfo(info))
        })
        .catch(err => dispatch(setError()))
    };
    fetchPokemons();
  }, [offsetPage]);

  const skeleton = Array(10).fill(null).map((_, idx) => <LoadingPokemon key={idx} />);
  const pokemonItems = pokemonsInfoList.map((pkmn: PokemonInfoType) => (
    <Pokemon key={pkmn.url} {...pkmn} />
  ));

  return (
    <div className="pokemons">
      <div className="container">
        <div className="pokemons__box box-pokemons">
          {status === StatusEnum.LOADING ? skeleton : pokemonItems}
        </div>
      </div>
    </div>
  );
};
