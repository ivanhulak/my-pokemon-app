import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PokemonInfoType, PokemonType } from "../../@types/pokemons/common";
import { FetchPokemonsParamsType, FetchPokemonsType } from "../../@types/pokemons/fetchTypes";
import { POKEMON_API_POKEMON_URL } from "../../constants";
import { fetchPokemonsInfoFunc } from "../../utils/functions/fetchPokemonsInfoFunc";

export const fetchPokemons = createAsyncThunk(
   "pokemons/fetchPokemons",
   async ({ offset, limit }: FetchPokemonsParamsType) => {
     const { data } = await axios.get<FetchPokemonsType>(
       POKEMON_API_POKEMON_URL, { params: { offset, limit } }
     );
     const promises = data.results.map((item: PokemonType) =>
       fetchPokemonsInfoFunc(item.url)
     );
     const info = await Promise.all(promises);
     const obj: { count: number, info: PokemonInfoType[], limit: number } = {
       count: data.count,
       info,
       limit
     };
     return obj;
   }
 );