import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PokemonInfoType, PokemonType } from "../../@types/pokemons/common";
import { FetchByNameParamsType } from "../../@types/pokemons/fetchTypes";
import { POKEMON_API_POKEMON_URL } from "../../constants";
import { fetchPokemonsInfoFunc } from "../../utils/functions/fetchPokemonsInfoFunc";

export const fetchPokemonByName = createAsyncThunk(
  "pokemons/fetchPokemonByName",
  async ({ search, totalCount, offset, limit }: FetchByNameParamsType) => {
    const { data } = await axios.get(
      `${POKEMON_API_POKEMON_URL}?offset=0&limit=${totalCount}`
    );
    const result = data.results.filter((pokemon: PokemonType) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    const promises = result
      .slice(offset, offset + (limit - 1))
      .map((item: PokemonType) => fetchPokemonsInfoFunc(item.url));
    const obj = {
      info: await Promise.all(promises),
      count: result.length,
      limit,
    };
    return obj as { info: PokemonInfoType[]; count: number; limit: number };
  }
);
