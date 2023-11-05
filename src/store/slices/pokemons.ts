import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusEnum } from "../../@types/enums/StatusEnum";
import { PokemonInfoType } from "../../@types/pokemons-types";
import { recountFn } from "../../utils/functions/recountFn";
import { RootState } from "../store";
import { fetchSinglePokemon } from "../reducers/fetchSinglePokemon";
import { fetchPokemons } from "../reducers/fetchPokemons";
import { fetchPokemonsByType } from "../reducers/fetchPokemonsByType";
import { fetchPokemonByName } from "../reducers/fetchPokemonByName";

export interface PokemonsSlice {
  count: number;
  totalCount: number;
  status: StatusEnum.LOADING | StatusEnum.SUCCESS | StatusEnum.ERROR;
  pokemonsInfoList: PokemonInfoType[];
  errorMessage: string | undefined;
  pages: number[];
  portionSize: number;
  portionsCount: number;
  singlePokemon: PokemonInfoType;
}
const initialState: PokemonsSlice = {
  count: 0,
  totalCount: 0,
  pages: [],
  portionSize: 10,
  portionsCount: 0,
  status: StatusEnum.LOADING,
  pokemonsInfoList: [],
  errorMessage: undefined,
  singlePokemon: {} as PokemonInfoType,
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setRecountAll: (state, action: PayloadAction<number>) => {
      recountFn(state, state.count, action.payload, '1')
    },
    setDeviceType(state, action: PayloadAction<string>){
      action.payload === 'mobile' ? state.portionSize = 5 : state.portionSize = 10
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.pending, (state) => {
      state.status = StatusEnum.LOADING;
    });
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.pokemonsInfoList = action.payload.info;
      state.count = action.payload.count;
      state.totalCount = action.payload.count;
      state.status = StatusEnum.SUCCESS;
      recountFn(state, state.count, action.payload.limit, '1')
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
      state.pokemonsInfoList = action.payload.info;
      state.count = action.payload.count;
      recountFn(state, action.payload.count, action.payload.limit, '2')
      state.status = StatusEnum.SUCCESS;
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
      state.pokemonsInfoList = action.payload.info;
      recountFn(state, action.payload.count, action.payload.limit, '2')
      state.status = action.payload.info.length ? StatusEnum.SUCCESS : StatusEnum.LOADING;
    });
    builder.addCase(fetchPokemonByName.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.status = StatusEnum.ERROR;
    });
  },
});

export const selectPokemons = (state: RootState) => state.pokemons

export const { setRecountAll, setDeviceType } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;
