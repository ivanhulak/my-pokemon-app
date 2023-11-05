import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchByTypeParamsType, ReturnedObj } from "../../@types/params-types";
import { AnotherPokemonType } from "../../@types/pokemons-types";
import { AllTypesType } from "../../utils/allTypes";
import { fetchPokemonsInfoFunc } from "../../utils/functions/fetchPokemonsInfoFunc";
import { fetchPokemonsTypeFunc } from "../../utils/functions/fetchPokemonsTypeFunc";

export const fetchPokemonsByType = createAsyncThunk(
  "pokemons/fetchPokemonsByType",
  async ({ types, offset, limit }: FetchByTypeParamsType) => {
    const typesPromises: any = [];
    types?.forEach((type: AllTypesType) => {
      typesPromises.push(fetchPokemonsTypeFunc(type.url));
    });
    const recievedTypes = await Promise.all(typesPromises);
    const allPokemons: AnotherPokemonType[][] = [];
    recievedTypes.forEach((elem) => allPokemons.push(elem.data.pokemon));
    const newAllPokemons = allPokemons.flat(1);
    if(newAllPokemons.length < offset) offset = 0
    const pokemonsInfoPromises = newAllPokemons
      .slice(offset, offset + (limit - 1))
      .map((item: AnotherPokemonType) =>
        fetchPokemonsInfoFunc(item.pokemon.url)
      );
    const info = await Promise.all(pokemonsInfoPromises)
    const obj = {
      info,
      count: newAllPokemons.length,
      limit,
    };
    return obj as ReturnedObj;
  }
);
