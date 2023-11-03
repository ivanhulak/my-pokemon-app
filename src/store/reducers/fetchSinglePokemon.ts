import { createAsyncThunk } from "@reduxjs/toolkit";
import { POKEMON_API_POKEMON_URL } from "../../constants";
import { fetchPokemonsInfoFunc } from "../../utils/functions/fetchPokemonsInfoFunc";

export const fetchSinglePokemon = createAsyncThunk(
  "pokemons/fetchSinglePokemon",
  async ({ id }: { id: number }) => {
    const url = `${POKEMON_API_POKEMON_URL}/${id}`;
    return await fetchPokemonsInfoFunc(url);
  }
);
