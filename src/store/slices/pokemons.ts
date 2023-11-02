import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { StatusEnum } from "../../@types/enums/StatusEnum";
import { AnotherPokemonType, PokemonInfoType, PokemonType } from "../../@types/pokemons/common";
import {
  FetchPokemonsByTypeParamsType,
  FetchPokemonsParamsType,
  FetchPokemonsType,
} from "../../@types/pokemons/fetchTypes";
import { POKEMON_API_POKEMON_URL } from "../../constants";
import { addPokemonToList } from "../../utils/functions/addPokemonToList";
import { fetchPokemonsInfoFunc } from "../../utils/functions/fetchPokemonsInfoFunc";
import { recountAll } from "../../utils/functions/recountAll";
import { RootState } from "../store";

interface PokemonsSlice {
  count: number;
  status: StatusEnum.LOADING | StatusEnum.SUCCESS | StatusEnum.ERROR;
  pokemonsInfoList: PokemonInfoType[];
  errorMessage: string | undefined;
  pages: number[];
  portionSize: number;
  portionsCount: number;
  singlePokemon: PokemonInfoType;
  isMobile: null | boolean;
}
const initialState: PokemonsSlice = {
  count: 0,
  pages: [],
  portionSize: 10,
  portionsCount: 0,
  status: StatusEnum.LOADING,
  pokemonsInfoList: [],
  errorMessage: undefined,
  singlePokemon: {} as PokemonInfoType,
  isMobile: null
};

// --------- Async Thunks ---------
export const fetchSinglePokemon = createAsyncThunk(
  "pokemons/fetchSinglePokemon",
  async ({ id }: any ) => {
    const url = `${POKEMON_API_POKEMON_URL}/${id}`
    return await fetchPokemonsInfoFunc(url)
  }
);
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
    const obj: { count: number, info: PokemonInfoType[] } = {
      count: data.count,
      info,
    };
    return obj;
  }
);
export const fetchPokemonsByType = createAsyncThunk(
  "pokemons/fetchPokemonsByType",
  async ({ url, selectedType, offset, limit }: FetchPokemonsByTypeParamsType) => {
    const { data } = await axios.get(url);
    if (data?.pokemon) {
      const listPokemons: AnotherPokemonType[] = data.pokemon
        .filter((item: any) => (data.pokemon.indexOf(item) >= offset) 
        && (data.pokemon.indexOf(item) < offset + limit))
        .map((p: AnotherPokemonType) =>
          addPokemonToList(p.pokemon, selectedType)
        );
      const returnedObj: any = {items: listPokemons, count: data.pokemon.length, limit}
      return returnedObj
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
export const fetchPokemonByName = createAsyncThunk(
  "pokemons/fetchPokemonByName",
  async ({ search }: {search: string }) => {
    const { data } = await axios.get(`${POKEMON_API_POKEMON_URL}?offset=0&limit=${1292}`)
    const result = data.results.filter((pokemon: PokemonType) => 
      pokemon.name.toLowerCase().includes(search.toLowerCase()))
    const promises = result.map((item: PokemonType) =>
      fetchPokemonsInfoFunc(item.url)
    );
    return { info: await Promise.all(promises) } as { info: PokemonInfoType[] };
  }
);

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPages: (state, action: PayloadAction<number>) => {
      const result = recountAll(state.count, action.payload, state.portionSize)
      state.portionsCount = result.portionsCount
      state.pages = result.allPages;
    },
    setRecountAll: (state, action: PayloadAction<number>) => {
      const result = recountAll(state.count, action.payload, state.portionSize)
      state.portionsCount = result.portionsCount
      state.pages = result.allPages;
    },
    setPokemonsByName: (state, action: PayloadAction<string>) => {
      state.pokemonsInfoList = state.pokemonsInfoList.filter((obj: PokemonInfoType) => {
        return obj.name.includes(action.payload)
      })
    },
    setDeviceType(state, action: PayloadAction<boolean>){
      state.isMobile = action.payload
      state.portionSize = 10
      if(action.payload){
        state.portionSize = 5
      }
    }
  },
  extraReducers: (builder) => {
    // ------- fetchPokemons ------
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
    // ------- fetchPokemonsByType ------
    builder.addCase(fetchPokemonsByType.pending, (state) => {
      state.status = StatusEnum.LOADING;
    });
    builder.addCase(fetchPokemonsByType.fulfilled, (state, action) => {
      state.pokemonsInfoList = action.payload.items;
      state.count = action.payload.count;
      state.status = StatusEnum.SUCCESS;
      const result = recountAll(state.count, action.payload.limit, state.portionSize)
      state.portionsCount = result.portionsCount
      state.pages = result.allPages;
      if(!action.payload.items.length){
        state.status = StatusEnum.ERROR
      }
    });
    builder.addCase(fetchPokemonsByType.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.status = StatusEnum.ERROR;
    });
    // ------- fetchSinglePokemon ------
    builder.addCase(fetchSinglePokemon.pending, (state) => {
      state.status = StatusEnum.LOADING;
    });
    builder.addCase(fetchSinglePokemon.fulfilled, (state, action) => {
      state.status = StatusEnum.SUCCESS;
      state.singlePokemon = action.payload;
    });
    builder.addCase(fetchSinglePokemon.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.status = StatusEnum.ERROR;
    });
    // ------- fetchPokemonByName ------
    builder.addCase(fetchPokemonByName.pending, (state) => {
      state.status = StatusEnum.LOADING;
    });
    builder.addCase(fetchPokemonByName.fulfilled, (state, action) => {
      state.status = StatusEnum.SUCCESS;
      state.pokemonsInfoList = action.payload.info;
    });
    builder.addCase(fetchPokemonByName.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.status = StatusEnum.ERROR;
    });
  },
});

// Selectors
export const selectPokemonsData = (state: RootState) => state.pokemons

export const { setPages, setRecountAll, setPokemonsByName, setDeviceType } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;
