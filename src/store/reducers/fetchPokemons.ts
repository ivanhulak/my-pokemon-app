import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchPokemonsType } from "../../@types/fetch-types";
import { FetchPokemonsParamsType } from "../../@types/params-types";
import { PokemonInfoType, PokemonType } from "../../@types/pokemons-types";
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