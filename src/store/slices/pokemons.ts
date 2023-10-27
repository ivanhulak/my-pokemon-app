import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AnotherPokemonType, ListPokemonType, PokemonInfoType, PokemonType } from "../../@types/pokemons/common";
import {
  FetchPokemonsByTypeParamsType,
  FetchPokemonsParamsType,
  FetchPokemonsType,
} from "../../@types/pokemons/fetchTypes";
import { AllTypesType } from "../../utils/some_data/allTypes";

export enum StatusEnum {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PokemonsSlice {
  count: number;
  status: StatusEnum.LOADING | StatusEnum.SUCCESS | StatusEnum.ERROR;
  pokemonsInfoList: PokemonInfoType[];
  errorMessage: string | undefined;
  pages: number[];
  portionSize: number;
  portionsCount: number;
}
const initialState: PokemonsSlice = {
  count: 0,
  pages: [],
  portionSize: 10,
  portionsCount: 0,
  status: StatusEnum.LOADING,
  pokemonsInfoList: [],
  errorMessage: undefined,
};

const fetchPokemonsInfoFunc = async (url: string) => {
  const { data } = await axios.get(`${url}`);
  const { id, name, stats, weight, types, height } = data;
  const obj: PokemonInfoType = {
    id,
    url,
    name,
    types,
    stats,
    weight,
    height,
    image: data.sprites.other.dream_world.front_default,
    image_reserve: data.sprites.other.home.front_default,
  };
  return obj;
};

type ReturnObjType = {
  count: number;
  info: PokemonInfoType[];
};

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchPokemons",
  async ({ offset, limit }: FetchPokemonsParamsType) => {
    const { data } = await axios.get<FetchPokemonsType>(
      "https://pokeapi.co/api/v2/pokemon",
      { params: { offset, limit } }
    );
    const promises = data.results.map((item: PokemonType) =>
      fetchPokemonsInfoFunc(item.url)
    );
    const info = await Promise.all(promises);
    const obj: ReturnObjType = {
      count: data.count,
      info,
    };
    return obj as ReturnObjType;
  }
);


export const fetchPokemonsByType = createAsyncThunk(
  "pokemons/fetchPokemonsByType",
  async ({ url, selectedType }: FetchPokemonsByTypeParamsType) => {
    const { data } = await axios.get(url);
    if (data?.pokemon) {
      const listPokemons = data.pokemon.map((p: AnotherPokemonType) =>
        addPokemonToList(p.pokemon, selectedType)
      );
      return listPokemons;
    }
    if (data?.results) {
      const promises = data.results.map((item: PokemonType) =>
        fetchPokemonsInfoFunc(item.url)
      );
      const info = await Promise.all(promises);
      return info;
    }
  }
);

const addPokemonToList = (addedPokemon: PokemonType, selectedType: AllTypesType) => {
  const pokemonId = parseInt(
    addedPokemon.url
      .replace("https://pokeapi.co/api/v2/pokemon/", "")
      .replace("/", "") // 'id'
  );
  const listPokemon: ListPokemonType = {
    name: addedPokemon.name,
    url: addedPokemon.url,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`,
    image_reserve: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`,
    id: pokemonId,
    types: [{ slot: 1, type: selectedType }],
  };

  return listPokemon;
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPages: (state) => {
      const pagesCount = Math.ceil(state.count / 10);
      state.portionsCount = Math.ceil(pagesCount / state.portionSize);
      const allPages = [];
      for (let i = 1; i <= pagesCount; i++) {
        allPages.push(i);
      }
      state.pages = allPages;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.pending, (state) => {
      state.status = StatusEnum.LOADING;
    });
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.pokemonsInfoList = action.payload.info;
      state.count = action.payload.count;
      state.status = StatusEnum.SUCCESS;
    });
    builder.addCase(fetchPokemons.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.status = StatusEnum.ERROR;
    });
    builder.addCase(fetchPokemonsByType.pending, (state) => {
      state.status = StatusEnum.LOADING;
    });
    builder.addCase(fetchPokemonsByType.fulfilled, (state, action) => {
      state.pokemonsInfoList = action.payload;
      state.status = StatusEnum.SUCCESS;
    });
    builder.addCase(fetchPokemonsByType.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.status = StatusEnum.ERROR;
    });
  },
});

export const { setPages } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;
